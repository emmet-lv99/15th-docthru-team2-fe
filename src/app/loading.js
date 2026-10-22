// src/app/loading.js — 라우트 전환 중 보여 주는 기본 로딩 화면 (Next App Router 규칙 파일)
//
// 화면 데이터를 기다리는 동안 스피너를 보여 줘요.
// 개별 화면에서 더 예쁜 로딩이 필요하면 그 폴더에 loading.js 를 따로 두면 됩니다.
import { Loading } from '@/components/Loading';

export default function RouteLoading() {
  return <Loading title="불러오는 중이에요" description="잠시만 기다려 주세요." />;
}
