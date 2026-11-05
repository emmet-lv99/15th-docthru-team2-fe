// src/app/api/translate/route.js
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Next.js 라우트 함수 타임아웃 방지
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response('번역할 원문 텍스트가 필요합니다.', { status: 400 });
    }

    // Google Gemini 1.5 Flash 모델에 스트리밍 번역 요청
    const result = streamText({
      model: google('gemini-3.5-flash'),
      system: `너는 IT 및 소프트웨어 개발 기술 문서를 전문적으로 번역하는 시니어 테크니컬 라이터다.
영문 공식 문서를 읽기 쉬운 한국어로 자연스럽고 명확하게 번역하라.
- 전문 개발 용어(Hook, Component, State, Hydration, SSR 등)는 관례적인 한글 표기 또는 원어를 유지한다.
- 불필요한 사족이나 인사말은 절대 넣지 말고 오직 '번역된 본문 내용'만 반환한다.
- 웹 에디터에 주입할 수 있도록 깔끔한 HTML 태그(<p>, <h1>~<h3>, <ul>, <li>, <pre><code> 등)를 적절히 활용하여 서식을 보존하라.`,
      prompt: `다음 영문 기술 문서를 한국어로 전문 번역해줘:\n\n${prompt}`,
    });

    // 클라이언트로 한 글자씩 실시간 스트리밍 전송
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI Translation Error:', error);
    return new Response(error.message || 'AI 번역 중 오류가 발생했습니다.', { status: 500 });
  }
}
