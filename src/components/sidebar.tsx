"use client"; // 이 파일은 브라우저에서 실행되는 Client Component라는 선언

// Sidebar 컴포넌트: 왼쪽 메뉴 영역을 만드는 함수
export default function Sidebar({
  dark,            // 현재 다크 모드인지 여부(true/false)
  onToggleDark,    // 다크 모드 토글 버튼을 눌렀을 때 실행되는 함수
}: {
  dark: boolean;
  onToggleDark: () => void;
}) {
  // 다크 모드에 따라 배경색과 hover 색상을 다르게 설정
  const bg = dark ? "#1e293b" : "#1f2937";
  const hoverColor = dark ? "#334155" : "#374151";

  // 메뉴 항목의 기본 스타일: padding, 둥근 모서리, 마우스 포인터, hover 시 부드럽게 색상 전환
  const itemStyle: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.2s",
  };

  // 사이드바에 표시할 메뉴와 아이콘 정의
  const menus = [
    { name: "Dashboard", icon: "📊" },   // 대시보드: 기본 페이지
    { name: "Reports",  icon: "📈" },    // 보고서
    { name: "Settings", icon: "⚙️" },    // 설정
    { name: "Team",     icon: "🧑‍🤝‍🧑" }, // 팀 관련 메뉴
  ];

  return (
    <nav
      style={{
        width: 240,               // 사이드바 너비
        background: bg,           // 다크/라이트 모드에 따른 배경색
        color: "white",           // 글자 색상
        padding: "24px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",  // 위에서 아래로 세로 배치
        gap: 20,                  // 요소 간 간격
      }}
    >
      {/* 로고/타이틀 */}
      <div style={{ fontSize: 22, fontWeight: 700 }}>HanaLoop</div>

      {/* 메뉴 리스트 */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {menus.map((m, i) => (
          <li
            key={m.name}  // 각 메뉴를 구분하는 고유 key
            // 첫 번째 메뉴(Dashboard)는 기본 배경 적용, 나머지는 투명
            style={{ ...itemStyle, background: i === 0 ? hoverColor : "transparent" }}
            // 마우스를 올리면 hover 색상으로 바꿈
            onMouseEnter={(e) => (e.currentTarget.style.background = hoverColor)}
            // 마우스를 떼면 첫 메뉴는 hover 색 유지, 나머지는 투명으로 복귀
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = i === 0 ? hoverColor : "transparent")
            }
          >
            {m.icon} {m.name} {/* 메뉴 아이콘과 이름 표시 */}
          </li>
        ))}
      </ul>

      {/* 다크모드 토글 버튼 */}
      <button
        style={{
          marginTop: "auto",        // 사이드바 맨 하단에 고정
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: hoverColor,
          cursor: "pointer",
        }}
        onClick={onToggleDark}      // 클릭 시 다크 모드 전환 함수 실행
      >
        {dark ? "라이트 모드" : "다크 모드"}
      </button>

      {/* 하단 카피라이트 */}
      <div style={{ fontSize: 12, color: "#9ca3af" }}>© 2025 HanaLoop</div>
    </nav>
  );
}
