// 회사의 온실가스 배출 정보를 나타내는 타입
export type GhgEmission = {
  yearMonth: string;  // 'YYYY-MM' 형식의 연-월 (예: "2025-03")
  source: string;     // 배출원(에너지원) 예: "gasoline", "diesel", "LPG"
  emissions: number;  // 이 월에 배출된 CO₂량 (톤 단위)
};

// 개별 회사를 나타내는 타입
export type Company = {
  id: string;              // 회사 고유 ID (예: "c1")
  name: string;            // 회사 이름 (예: "Acme Corp")
  country: string;         // 회사가 속한 국가 코드 (예: "US", "DE")
  emissions: GhgEmission[];// 이 회사의 월별 배출량 데이터 배열
};

// 게시물(리포트나 메모 등)을 나타내는 타입
export type Post = {
  id: string;            // 게시물 고유 ID
  title: string;         // 게시물 제목
  resourceUid: string;   // 이 게시물이 속한 회사의 id (Company.id와 매칭)
  dateTime: string;      // 게시 시점 (YYYY-MM)
  content: string;       // 게시물 내용 (텍스트)
};
