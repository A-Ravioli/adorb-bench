'use client';

import { GeneratedCreature } from '../types';
import { AVAILABLE_MODELS } from '../constants';

interface CreatureCardProps {
  creature: GeneratedCreature | null;
  modelId: string;
  loading: boolean;
  onVote: () => void;
  disabled: boolean;
}

export default function CreatureCard({ creature, modelId, loading, onVote, disabled }: CreatureCardProps) {
  const modelName = AVAILABLE_MODELS.find(m => m.id === modelId)?.name || modelId;

  return (
    <div className="border border-gray-200 rounded p-6 flex flex-col items-center justify-between min-h-[300px]">
      <div className="text-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wide">
          {modelName}
        </h3>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        {loading ? (
          <div className="text-center">
            <p className="text-sm text-gray-400">...</p>
          </div>
        ) : creature ? (
          <div className="text-center">
            {creature.error ? (
              <div className="text-red-500">
                <p className="text-xs">{creature.error}</p>
              </div>
            ) : (
              <div className="text-6xl mb-4 select-all font-mono leading-tight whitespace-nowrap overflow-hidden text-ellipsis px-2">
                {creature.creature}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-300 text-center">
            <p className="text-4xl">?</p>
          </div>
        )}
      </div>

      {creature && !creature.error && !loading && (
        <button
          onClick={onVote}
          disabled={disabled}
          className="mt-6 px-6 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          type shit
        </button>
      )}
    </div>
  );
}

