"use client"; 
// 이 파일은 브라우저에서 실행되는 Client Component임을 명시

import { useEffect, useMemo, useState } from "react"; // React 훅
import CountUp from "react-countup";                 // 숫자를 애니메이션으로 카운트업
import type { Company } from "../../types";          // Company 타입 정의 불러오기
import { fetchCompanies } from "../lib/api";         // 회사 데이터를 가져오는 가짜 백엔드 API
import CompanyChart from "../components/chart";      // 회사별 탄소 배출량 차트 컴포넌트

export default function Page() {
  // 상태(state) 정의
  const [companies, setCompanies] = useState<Company[]>([]); // 회사 목록
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(""); // 선택된 회사 ID
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");      // 선택된 월 (기본값: 전체)
  const [loading, setLoading] = useState(true);         // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // API 호출 에러 메시지

  // 회사별 막대 색상 팔레트
  const colors: Record<string, string> = {
    c1: "#3b82f6", // 파랑
    c2: "#10b981", // 초록
    c3: "#f59e0b", // 주황 (추가 회사 대비)
  };

  // 컴포넌트가 처음 렌더링될 때 회사 데이터 가져오기
  useEffect(() => {
    fetchCompanies()
      .then((data) => {
        setCompanies(data);                   // 회사 목록 저장
        setSelectedCompanyId(data[0]?.id ?? ""); // 기본으로 첫 번째 회사 선택
        setSelectedMonth("ALL");              // 월 선택을 전체로 초기화
      })
      .catch((err) => setError(err.message))   // 에러 발생 시 저장
      .finally(() => setLoading(false));       // 로딩 상태 종료
  }, []);

  // 현재 선택된 회사 정보
  const current = useMemo(
    () => companies.find((c) => c.id === selectedCompanyId),
    [companies, selectedCompanyId]
  );

  // 현재 회사의 모든 월 목록을 추출 및 ["ALL", ...월] 형태로 반환
  const months = useMemo(() => {
    const arr = current?.emissions.map((e) => e.yearMonth) ?? [];
    return ["ALL", ...arr];
  }, [current]);

  // 선택된 회사와 월 기준으로 총 배출량 합계 계산
  const total = useMemo(() => {
    if (!current) return 0;
    const list =
      selectedMonth === "ALL"
        ? current.emissions
        : current.emissions.filter((e) => e.yearMonth === selectedMonth);
    return list.reduce((sum, e) => sum + e.emissions, 0);
  }, [current, selectedMonth]);

  // 로딩 중 간단한 메시지 출력
  if (loading) return <p>불러오는 중...</p>;

  // 에러가 발생 시  에러 메시지와 다시 시도 버튼 출력
  if (error)
    return (
      <div>
        <p>에러 발생: {error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchCompanies()
              .then((data) => {
                setCompanies(data);
                setSelectedCompanyId(data[0]?.id ?? "");
                setSelectedMonth("ALL");
              })
              .catch((err) => setError(err.message))
              .finally(() => setLoading(false));
          }}
        >
          다시 시도
        </button>
      </div>
    );

  // 메인 UI 렌더링
  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>탄소 배출량 대시보드</h1>

      {/* --- 컨트롤 바: 회사·기간 선택 --- */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        {/* 회사 선택 드롭다운 */}
        <label>
          회사:&nbsp;
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>
        </label>

        {/* 기간(월) 선택 드롭다운 */}
        <label>
          기간:&nbsp;
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {months.map((m) => (
              <option key={m} value={m}>
                {m === "ALL" ? "전체" : m}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* --- KPI 카드: 총 배출량 --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {selectedMonth === "ALL" ? "총 배출량(전체 기간)" : `총 배출량(${selectedMonth})`}
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>
            {/* CountUp: 총 배출량을 0에서 total까지 애니메이션으로 증가시킴 */}
            <CountUp end={total} duration={1.5} separator="," /> 톤
          </div>
        </div>
      </div>

      {/* --- 차트 영역 --- */}
      {current && (
        <CompanyChart
          company={current}                         // 현재 선택된 회사 데이터
          month={selectedMonth}                      // 선택된 기간
          barColor={colors[current.id] ?? "#3b82f6"} // 회사별 맞춤 막대 색상
        />
      )}
    </div>
  );
}
