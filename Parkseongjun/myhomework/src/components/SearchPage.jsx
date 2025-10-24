// src/components/SearchPage.jsx
import React, { useState } from 'react';
import { useTrend } from '../context/TrendProvider';

function SearchForm() {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [timeUnit, setTimeUnit] = useState('month');
  const [category, setCategory] = useState('50000000'); // 쇼핑 카테고리 ID (예: 패션의류)

  const { fetchTrendData } = useTrend();

  const handleSubmit = (e) => { // '분석하기' 버튼을 누르면 handleSubmit 함수가 실행
    e.preventDefault();

    const requestBody = {
      startDate,
      endDate,
      timeUnit,
      category: [{
        name: "카테고리",
        param: [category] // 카테고리 ID를 param 배열에 포함
      }],
      device: '', // 디바이스 (빈 문자열이면 전체)
      gender: '', // 성별 (빈 문자열이면 전체)
      ages: [] // 연령대 (빈 배열이면 전체)
    };

    fetchTrendData(requestBody);
  };

  return (
    <form onSubmit={handleSubmit} className="card search-form">
      <h2>조회 조건 설정</h2>
      <div className="form-grid">
        {/* --- 상단 1열 --- */}
        <div className="form-group">
          <label htmlFor="startDate">시작일</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">종료일</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeUnit">분석 단위</label>
          <select
            id="timeUnit"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
          >
            <option value="date">일간</option>
            <option value="week">주간</option>
            <option value="month">월간</option>
          </select>
        </div>

        {/* --- 하단 2열 --- */}
        <div className="form-group category-group">
          <label htmlFor="category">쇼핑 카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="50000000">패션의류</option>
            <option value="50000001">패션잡화</option>
            <option value="50000002">화장품/미용</option>
            <option value="50000003">디지털/가전</option>
            <option value="50000004">가구/인테리어</option>
            <option value="50000005">식품</option>
            <option value="50000006">스포츠/레저</option>
            <option value="50000007">생활/건강</option>
            <option value="50000008">여가/생활편의</option>
            <option value="50000009">출산/육아</option>
            <option value="50000010">반려동물용품</option>
          </select>
        </div>

        <div className="form-group button-group">
          <button type="submit" className="submit-button">
            분석하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
