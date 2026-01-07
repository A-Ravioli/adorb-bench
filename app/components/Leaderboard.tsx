'use client';

import { useEffect, useState } from 'react';
import { getLeaderboard, resetRankings } from '../utils/rankings';
import { AVAILABLE_MODELS } from '../constants';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<ReturnType<typeof getLeaderboard>>([]);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset all rankings?')) {
      resetRankings();
      setLeaderboard([]);
      setShowReset(false);
    }
  };

  const getModelName = (modelId: string) => {
    return AVAILABLE_MODELS.find(m => m.id === modelId)?.name || modelId;
  };

  if (leaderboard.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-12 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wide">
          Leaderboard
        </h2>
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showReset ? 'cancel' : 'reset'}
        </button>
      </div>

      {showReset && (
        <div className="mb-6 p-4 border border-gray-200 rounded">
          <button
            onClick={handleReset}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Confirm reset
          </button>
        </div>
      )}

      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.modelId}
            className="flex items-center justify-between py-3 border-b border-gray-100"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 w-6">
                {index + 1}
              </span>
              <span className="text-sm text-gray-900">
                {getModelName(entry.modelId)}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-900">
                  {entry.winRate.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-400">
                  {entry.stats.wins}W {entry.stats.losses}L
                </p>
              </div>
              {entry.stats.examples.length > 0 && (
                <span className="text-2xl font-mono">
                  {entry.stats.examples[0]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

