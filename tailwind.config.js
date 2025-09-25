/** @type {import('tailwindcss').Config} */
// ↑ TypeScript 환경에서도 이 파일의 타입을 자동 완성하기 위해 Tailwind의 Config 타입을 지정

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src 폴더 내부의 모든 JS/TS/JSX/TSX/MDX 파일에서 Tailwind 클래스를 스캔
    './app/**/*.{js,ts,jsx,tsx,mdx}', // app 폴더 내부의 모든 JS/TS/JSX/TSX/MDX 파일도 스캔
  ],

  theme: {
    extend: {
      colors: {
        // 프로젝트 전역에서 재사용할 **맞춤 색상 팔레트**
        primary:   '#3b82f6', // 주요 버튼·강조 색 (파랑)
        secondary: '#10b981', // 보조 강조 색 (초록)
        accent:    '#f97316', // 포인트 색 (주황)
        darkbg:    '#1f2937', // 어두운 배경 (컴포넌트나 카드 배경)
        darkerbg:  '#111827', // 더 어두운 배경 (전체 페이지 배경이나 헤더)
        lighttext: '#f3f4f6', // 밝은 글자색
        graytext:  '#9ca3af', // 중간 톤의 회색 글자색
      },
      // 이 외에도 spacing(간격), fontFamily(폰트), borderRadius 등
      // 프로젝트에서 반복적으로 쓰일 디자인 속성을 여기에 추가해서 확장 가능
    },
  },

  plugins: [], // Tailwind 플러그인을 추가할 때 사용 (예: forms, typography 등)
};
