// src/app/api/reader/route.js
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';

function isSafePublicUrl(urlString) {
  try {
    const parsed = new URL(urlString);

    // 1. HTTP / HTTPS 프로토콜만 허용
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // 2. 루프백 및 로컬 주소 차단
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1'
    ) {
      return false;
    }

    // 3. 내부 사설망(Private IP) 및 클라우드 메타데이터 IP(Link-Local) 차단
    // - 10.0.0.0/8
    // - 172.16.0.0/12
    // - 192.168.0.0/16
    // - 169.254.0.0/16 (AWS / GCP / Azure 인스턴스 메타데이터)
    if (
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^169\.254\./.test(hostname)
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
  }

  // SSRF 방어 검증
  if (!isSafePublicUrl(targetUrl)) {
    return NextResponse.json(
      { error: '보안 정책상 내부망 또는 허용되지 않는 URL 대상입니다.' },
      { status: 400 },
    );
  }

  try {
    // 1. 외부 공식 문서 HTML fetch (6초 타임아웃 설정으로 서버 지연 방지)
    const response = await fetch(targetUrl, {
      signal: AbortSignal.timeout(6000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`페이지를 불러올 수 없습니다. (${response.status})`);
    }

    // 2. 최대 5MB 크기 제한 (메모리 고갈 방지)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 5 * 1024 * 1024) {
      throw new Error('원문 문서의 용량이 너무 큽니다. (최대 5MB 제한)');
    }

    const html = await response.text();
    if (html.length > 5 * 1024 * 1024) {
      throw new Error('원문 문서의 용량이 너무 큽니다. (최대 5MB 제한)');
    }

    // 2. JSDOM에 올린 뒤 문서의 baseURI(CDN 주소 등) 기준으로 상대 경로를 절대 URL로 변환
    const dom = new JSDOM(html, { url: targetUrl });
    const doc = dom.window.document;
    const baseUrl = doc.baseURI || targetUrl;

    // 상대 경로 이미지 src를 절대 URL로 보정
    doc.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        try {
          img.setAttribute('src', new URL(src, baseUrl).href);
        } catch {}
      }
    });

    // 상대 경로 링크 href를 절대 URL로 보정 & 새 창 열기 적용
    doc.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href) {
        try {
          a.setAttribute('href', new URL(href, baseUrl).href);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noreferrer noopener');
        } catch {}
      }
    });

    // 3. XSS 방어 소독 (Sanitization)
    // 3-1. 실행 가능한 위험 태그 제거 (base는 Readability가 srcset/poster 등을 변환할 때 doc.baseURI를 유지할 수 있도록 유지)
    doc.querySelectorAll('script, iframe, object, embed').forEach((el) => el.remove());

    // 3-2. 모든 요소에서 인라인 악성 이벤트 핸들러(on*) 및 위험 URL 스킴(javascript:) 제거
    doc.querySelectorAll('*').forEach((el) => {
      for (const attr of Array.from(el.attributes)) {
        const attrName = attr.name.toLowerCase();
        const attrValue = attr.value.trim().toLowerCase();
        if (
          attrName.startsWith('on') ||
          attrValue.startsWith('javascript:') ||
          attrValue.startsWith('data:text/html')
        ) {
          el.removeAttribute(attr.name);
        }
      }
    });

    const reader = new Readability(doc);
    const article = reader.parse();

    if (!article) {
      throw new Error('본문 내용을 추출하지 못했습니다.');
    }

    return NextResponse.json({
      title: article.title,
      content: article.content,
      byline: article.byline,
      excerpt: article.excerpt,
    });
  } catch (error) {
    if (error.name === 'TimeoutError') {
      return NextResponse.json(
        { error: '원격 서버의 응답 시간이 초과되었습니다. (6초 제한)' },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: error.message || '문서 파싱에 실패했습니다.' },
      { status: 500 },
    );
  }
}
