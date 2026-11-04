import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Next.js jsconfig.json의 @/* 경로 별칭과 동일하게 Vitest에서도 해석합니다.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
