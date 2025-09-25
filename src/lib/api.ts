import type { Company, Post } from "../../types";
// Company: 회사 데이터 타입
// Post: 게시물(Post) 데이터 타입

// --- 시드 데이터 ---
// 초기 더미 데이터(데이터베이스 대신 메모리에 저장)
const _companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      // 회사의 월별 배출량 데이터
      { yearMonth: "2025-01", source: "gasoline", emissions: 120 },
      { yearMonth: "2025-02", source: "diesel", emissions: 100 },
      { yearMonth: "2025-03", source: "LPG", emissions: 90 },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2025-01", source: "gasoline", emissions: 80 },
      { yearMonth: "2025-02", source: "diesel", emissions: 105 },
      { yearMonth: "2025-03", source: "LPG", emissions: 120 },
    ],
  },
];

// 게시물(Post) 초기 데이터: 실제 DB 대신 메모리에 저장
let _posts: Post[] = [
  {
    id: crypto.randomUUID(),       // 게시물 고유 ID를 무작위로 생성
    title: "1분기 지속 가능성 보고", // 게시물 제목
    resourceUid: "c1",             // 어떤 회사(Company.id)에 속한 글인지
    dateTime: "2025-03",           // 게시 시점(연-월)
    content: "Acme Corp의 1분기 CO₂ 배출량 검토", // 게시물 본문
  },
];

// --- 유틸 ---
// 비동기 API 호출을 흉내 내기 위한 보조 함수
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms)); // 지정 시간(ms) 지연
const jitter = () => 200 + Math.random() * 600;  // 200~800ms 사이 무작위 지연
const maybeFail = () => Math.random() < 0.15;    // 15% 확률로 실패(에러) 발생

// --- API ---
// 회사 목록을 가져오는 가짜 API
export async function fetchCompanies(): Promise<Company[]> {
  await delay(jitter());                  // 200~800ms 사이 무작위 지연
  if (maybeFail()) throw new Error("회사 데이터 불러오기 실패"); // 15% 확률로 에러 발생
  // 깊은 복사로 원본 _companies가 수정되지 않도록 보호
  return JSON.parse(JSON.stringify(_companies));
}

// 게시물(Post) 목록을 가져오는 가짜 API
export async function fetchPosts(companyId?: string): Promise<Post[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("게시물 불러오기 실패");
  // companyId가 있으면 해당 회사의 게시물만 필터링, 없으면 전체 반환
  const list = companyId
    ? _posts.filter((p) => p.resourceUid === companyId)
    : _posts;
  // 깊은 복사로 원본 _posts 배열을 보호
  return JSON.parse(JSON.stringify(list));
}

// 게시물(Post)을 새로 만들거나 수정하는 가짜 API
export async function createOrUpdatePost(
  p: Omit<Post, "id"> & { id?: string } // id가 없으면 새 글, 있으면 수정
): Promise<Post> {
  await delay(jitter());
  if (maybeFail()) throw new Error("게시물 저장 실패");

  if (p.id) {
    // 수정: 기존 id와 일치하는 게시물을 새 데이터로 교체
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  } else {
    // 새 글 생성: 고유 id를 부여해서 _posts에 추가
    const newPost: Post = { ...p, id: crypto.randomUUID() };
    _posts.push(newPost);
    return newPost;
  }
}
