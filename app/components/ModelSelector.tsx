'use client';

import { AVAILABLE_MODELS } from '../constants';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

export default function ModelSelector({ value, onChange, label, disabled }: ModelSelectorProps) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {AVAILABLE_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}

