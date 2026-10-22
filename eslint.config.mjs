// eslint.config.mjs — 강사님 정본(codeit-fs-nextjs-app-router-completed) 구조 그대로
//   뼈대는 우리 코드라서 벤치 호환 규칙은 필요 없어요 — 미사용 인자만 `_` 접두로 남겨두는 예외만 둡니다.
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  // eslint-config-next 기본 ignores 오버라이드 (강사님 정본과 동일)
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
