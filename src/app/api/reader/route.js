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
    // 1. 외부 공식 문서 HTML fetch
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`페이지를 불러올 수 없습니다. (${response.status})`);
    }

    const html = await response.text();

    // 2. JSDOM에 올린 뒤 이미지/링크 상대 경로를 절대 경로로 변환
    const dom = new JSDOM(html, { url: targetUrl });
    const doc = dom.window.document;

    // 상대 경로 이미지 src를 절대 URL로 보정
    doc.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        try {
          img.setAttribute('src', new URL(src, targetUrl).href);
        } catch {}
      }
    });

    // 상대 경로 링크 href를 절대 URL로 보정 & 새 창 열기 적용
    doc.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href) {
        try {
          a.setAttribute('href', new URL(href, targetUrl).href);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noreferrer noopener');
        } catch {}
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
    return NextResponse.json(
      { error: error.message || '문서 파싱에 실패했습니다.' },
      { status: 500 },
    );
  }
}
