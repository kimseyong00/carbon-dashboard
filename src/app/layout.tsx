"use client";
// 이 파일은 브라우저에서 실행되는 Client Component임을 명시
// 다크 모드 토글처럼 브라우저에서만 동작하는 state를 사용하기 위함

import Sidebar from "../components/sidebar"; // 왼쪽 사이드 메뉴 컴포넌트
import { useState } from "react";            // React state 훅

// 하기 코드는 Next.js의 metadata 설정은 Client Component와 함께 쓸 수 없어 주석 처리
// export const metadata = { title: "Emissions Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 다크 모드 상태 관리: true면 다크, false면 라이트
  const [dark, setDark] = useState(false);

  return (
    <html lang="ko" data-theme={dark ? "dark" : "light"}>
      {/* data-theme 속성은 나중에 CSS나 JS에서 다크/라이트 모드를 구분할 때 활용 가능 */}

      <body
        style={{
          margin: 0,                  // 기본 여백 제거
          minHeight: "100vh",         // 전체 화면 높이 채우기
          display: "flex",            // 좌우 레이아웃 구성(사이드바 + 메인)
          background: dark ? "#0f172a" : "#fafafa", // 다크 모드 여부에 따른 배경색
          color: dark ? "#f1f5f9" : "#111",         // 다크 모드 여부에 따른 글자색
          transition: "background 0.3s, color 0.3s", // 다크/라이트 전환 시 부드럽게 변환
        }}
      >
        {/* 왼쪽 사이드 메뉴 */}
        <Sidebar dark={dark} onToggleDark={() => setDark(!dark)} />
        {/* 오른쪽 메인 콘텐츠 영역 */}
        <main style={{ flex: 1, padding: "20px", boxSizing: "border-box" }}>
          {children} {/* 개별 페이지의 내용이 이 위치에 렌더링 */}
        </main>
      </body>
    </html>
  );
}
