// src/app/api/reader/route.js
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
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
