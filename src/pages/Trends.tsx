import React, { useState } from 'react';
import { TrendCard } from '../components/trends/TrendCard';
import { TrendAnalysis } from '../components/trends/TrendAnalysis';
import { trends } from '../data/trends';

export const Trends: React.FC = () => {
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  if (selectedTrend) {
    const trend = trends.find(t => t.title === selectedTrend);
    if (!trend) return null;
    return <TrendAnalysis trend={trend} onBack={() => setSelectedTrend(null)} />;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Trending Campaigns
          </h1>
          <p className="text-indigo-600">
            Analyze and learn from the most successful advertising campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend, index) => (
            <TrendCard
              key={index}
              trend={trend}
              onClick={() => setSelectedTrend(trend.title)} index={0}            />
          ))}
        </div>
      </div>
    </div>
  );
};