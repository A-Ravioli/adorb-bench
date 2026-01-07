'use client';

import { useState } from 'react';
import Image from 'next/image';
import CreatureCard from './components/CreatureCard';
import ModelSelector from './components/ModelSelector';
import Leaderboard from './components/Leaderboard';
import DarkModeToggle from './components/DarkModeToggle';
import { GeneratedCreature } from './types';
import { DEFAULT_MODEL_1, DEFAULT_MODEL_2 } from './constants';
import { saveVote, initializeRankings } from './utils/rankings';

export default function Home() {
  const [model1, setModel1] = useState(DEFAULT_MODEL_1);
  const [model2, setModel2] = useState(DEFAULT_MODEL_2);
  const [creature1, setCreature1] = useState<GeneratedCreature | null>(null);
  const [creature2, setCreature2] = useState<GeneratedCreature | null>(null);
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(false);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);

  // Initialize rankings on mount
  useState(() => {
    initializeRankings();
  });

  const handleGenerate = async () => {
    setLoading(true);
    setVoted(false);
    setCreature1(null);
    setCreature2(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model1,
          model2,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate creatures');
      }

      const data = await response.json();
      setCreature1(data.results[0]);
      setCreature2(data.results[1]);
    } catch (error) {
      console.error('Error generating creatures:', error);
      setCreature1({ 
        model: model1, 
        creature: '', 
        error: 'Failed to generate' 
      });
      setCreature2({ 
        model: model2, 
        creature: '', 
        error: 'Failed to generate' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (winner: 1 | 2) => {
    if (!creature1 || !creature2 || voted) return;

    const winnerModel = winner === 1 ? model1 : model2;
    const loserModel = winner === 1 ? model2 : model1;
    const winnerCreature = winner === 1 ? creature1.creature : creature2.creature;

    saveVote(winnerModel, loserModel, winnerCreature);
    setVoted(true);
    setRefreshLeaderboard(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16 px-4 relative">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      <div className="max-w-4xl mx-auto">
        {/* Header with Images */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-8">
            <div className="w-12 h-12 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <Image src="/images/kuromi.png" alt="" width={48} height={48} className="object-contain" />
            </div>
            <h1 className="text-5xl font-serif text-gray-900 dark:text-gray-100">
              adorb bench
            </h1>
            <div className="w-12 h-12 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <Image src="/images/labubu.png" alt="" width={48} height={48} className="object-contain" />
            </div>
          </div>
        </div>

        {/* Model Selectors & Generate Button */}
        <div className="flex gap-4 mb-16 items-end">
          <div className="flex-1">
            <ModelSelector
              value={model1}
              onChange={setModel1}
              label="Model 1"
              disabled={loading}
            />
          </div>
          <div className="flex-1">
            <ModelSelector
              value={model2}
              onChange={setModel2}
              label="Model 2"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || model1 === model2}
            className="px-8 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[38px]"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {model1 === model2 && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select two different models
            </p>
          </div>
        )}

        {/* Creature Cards */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          <CreatureCard
            creature={creature1}
            modelId={model1}
            loading={loading}
            onVote={() => handleVote(1)}
            disabled={voted}
          />
          <CreatureCard
            creature={creature2}
            modelId={model2}
            loading={loading}
            onVote={() => handleVote(2)}
            disabled={voted}
          />
        </div>

        {voted && (
          <div className="text-center mb-16">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Vote recorded
            </p>
            <button
              onClick={handleGenerate}
              className="px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Generate another
            </button>
          </div>
        )}

        {/* Leaderboard */}
        <Leaderboard key={refreshLeaderboard} />
      </div>
    </div>
  );
}

