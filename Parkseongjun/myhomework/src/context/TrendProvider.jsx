import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TrendContext = createContext();

export function TrendProvider({ children }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendData = async (requestBody) => {
    setLoading(true);
    setError(null);
    setChartData(null);

    try {
      // 네이버 쇼핑인사이트 데이터랩 API 호출
      const response = await axios.post('/v1/datalab/shopping/categories', requestBody, {
        headers: {
          'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
          'Content-Type': 'application/json',
        },
      });

      setChartData(response.data.results);
    } catch (e) {
      // 400 Bad Request와 같은 API 오류 잡기
      if (e.response) {
        setError(
          `API 오류 (Status ${e.response.status}): ${e.response.data.errorMessage}`
        );
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chartData,
    loading,
    error,
    fetchTrendData,
  };

  return (
    <TrendContext.Provider value={value}>{children}</TrendContext.Provider>
  );
}

// 컴포넌트에서 쉽게 사용하기 위한 Custom Hook
export function useTrend() {
  const context = useContext(TrendContext);
  if (!context) {
    throw new Error('Cannot use useTrend outside of TrendProvider');
  }
  return context;
}
