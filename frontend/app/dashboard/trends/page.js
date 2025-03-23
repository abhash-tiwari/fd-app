'use client';

import { useState, useEffect } from 'react';
import { getFraudTrends } from '@/data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendsPage() {
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getFraudTrends();
      setTrendData(data);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const lineChartData = {
    labels: trendData.map((item) => item.date),
    datasets: [
      {
        label: 'Daily Fraud Detections',
        data: trendData.map((item) => item.fraud_cases_detected),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fraud Detection Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Cases',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Fraud Detection Trends</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-[400px]">
          <Line options={options} data={lineChartData} />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Average Daily Cases</h3>
          <p className="text-3xl font-semibold text-primary-600">
            {(trendData.reduce((acc, curr) => acc + curr.fraud_cases_detected, 0) / trendData.length).toFixed(1)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Peak Cases</h3>
          <p className="text-3xl font-semibold text-primary-600">
            {Math.max(...trendData.map(item => item.fraud_cases_detected))}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Cases</h3>
          <p className="text-3xl font-semibold text-primary-600">
            {trendData.reduce((acc, curr) => acc + curr.fraud_cases_detected, 0)}
          </p>
        </div>
      </div>
    </div>
  );
} 
