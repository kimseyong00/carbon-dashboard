"use client"; 
// 이 파일이 브라우저에서 실행되는 Client Component임을 명시

import {
  BarChart,        // 막대그래프 전체 컨테이너
  Bar,             // 실제 막대(데이터 시각화 요소)
  XAxis,           // X축
  YAxis,           // Y축
  CartesianGrid,   // 그래프 배경의 격자선
  Tooltip,         // 마우스 오버 시 데이터 표시 툴팁
  ResponsiveContainer, // 화면 크기에 맞게 그래프 크기를 자동 조절
} from "recharts";

import type { Company } from "../../types"; 
// types.ts에서 Company 타입을 불러와 컴포넌트 props 타입으로 사용

// 컴포넌트가 받을 props 타입 정의
type Props = {
  company: Company;      // 그래프에 표시할 회사 데이터
  month?: string;        // 선택된 월 (선택 사항)
  barColor?: string;     // 막대 색상 (선택 사항, 기본값 설정됨)
};

// CompanyChart: 선택한 회사의 탄소 배출량을 막대그래프로 보여주는 컴포넌트
export default function CompanyChart({ company, month, barColor = "#3b82f6" }: Props) {
  // raw: 회사의 전체 배출 데이터를 month와 emissions 키만 가진 배열로 변환
  const raw = company.emissions.map((e) => ({ month: e.yearMonth, emissions: e.emissions }));

  // month가 "ALL"이 아니면 해당 월만 필터링해서 data 생성, 아니면 전체 데이터 사용
  const data = month && month !== "ALL" ? raw.filter((d) => d.month === month) : raw;

  return (
    <div style={{ width: "100%", height: 340 }}>
      {/* ResponsiveContainer: 부모 div의 크기에 맞춰 차트를 자동으로 리사이즈 */}
      <ResponsiveContainer>
        {/* BarChart: Recharts의 막대그래프 컨테이너 */}
        <BarChart data={data}>
          {/* 격자선: 차트 가독성 향상 */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X축: month(연-월) 데이터를 라벨로 사용 */}
          <XAxis dataKey="month" />
          {/* Y축: 배출량을 콤마(,)가 있는 숫자로 표시 */}
          <YAxis tickFormatter={(v) => Number(v).toLocaleString()} />
          {/* Tooltip: 마우스를 올리면 세부 수치를 표시 */}
          <Tooltip
            formatter={(value: number) => value.toLocaleString()} // 수치도 콤마 단위로 표시
            labelFormatter={(label) => `월: ${label}`}            // 라벨에 '월:' 접두어 추가
          />
          {/* Bar: 실제 막대그래프, dataKey='emissions'는 emissions 값을 높이로 사용 */}
          <Bar dataKey="emissions" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
