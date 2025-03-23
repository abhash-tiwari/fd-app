'use client';

import { useState, useEffect } from 'react';
import { getDashboardStats, getFraudList } from '@/data/mockData';
import { 
  ChartBarIcon, 
  ShieldExclamationIcon, 
  GlobeAltIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [fraudList, setFraudList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(getDashboardStats());
      setFraudList(getFraudList());
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <ChartBarIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Fraudulent Apps</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalFraudulentApps}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <GlobeAltIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Fraudulent URLs</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalFraudulentUrls}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <ShieldExclamationIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Recent Detections</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.recentDetections}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <MagnifyingGlassIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Active Investigations</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeInvestigations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Fraud List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Fraud Cases</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detection Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fraudList.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.type === 'app' ? 'App' : 'URL'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'High' ? 'bg-red-100 text-red-800' :
                      item.status === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.detectionDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 