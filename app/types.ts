export interface Model {
  id: string;
  name: string;
}

export interface GeneratedCreature {
  model: string;
  creature: string;
  error?: string;
}

export interface ModelStats {
  wins: number;
  losses: number;
  ties: number;
  totalGenerations: number;
  examples: string[];
}

export interface RankingData {
  [modelId: string]: ModelStats;
}

