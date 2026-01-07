import { RankingData, ModelStats } from '../types';

const STORAGE_KEY = 'adorb-bench-rankings';

export function initializeRankings(): void {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  }
}

export function getRankings(): RankingData {
  if (typeof window === 'undefined') return {};
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

function getOrCreateModelStats(modelId: string): ModelStats {
  const rankings = getRankings();
  
  if (!rankings[modelId]) {
    rankings[modelId] = {
      wins: 0,
      losses: 0,
      ties: 0,
      totalGenerations: 0,
      examples: []
    };
  }
  
  return rankings[modelId];
}

function saveRankings(rankings: RankingData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rankings));
}

export function saveVote(winnerModel: string, loserModel: string, winnerCreature: string): void {
  const rankings = getRankings();
  
  // Initialize or get existing stats
  const winnerStats = getOrCreateModelStats(winnerModel);
  const loserStats = getOrCreateModelStats(loserModel);
  
  // Update winner
  winnerStats.wins += 1;
  winnerStats.totalGenerations += 1;
  
  // Add example creature (keep only last 5)
  if (winnerCreature && !winnerStats.examples.includes(winnerCreature)) {
    winnerStats.examples.unshift(winnerCreature);
    if (winnerStats.examples.length > 5) {
      winnerStats.examples = winnerStats.examples.slice(0, 5);
    }
  }
  
  // Update loser
  loserStats.losses += 1;
  loserStats.totalGenerations += 1;
  
  // Save back to rankings
  rankings[winnerModel] = winnerStats;
  rankings[loserModel] = loserStats;
  
  saveRankings(rankings);
}

export function getLeaderboard(): Array<{ modelId: string; stats: ModelStats; winRate: number }> {
  const rankings = getRankings();
  
  return Object.entries(rankings)
    .map(([modelId, stats]) => {
      const totalBattles = stats.wins + stats.losses + stats.ties;
      const winRate = totalBattles > 0 ? (stats.wins / totalBattles) * 100 : 0;
      
      return {
        modelId,
        stats,
        winRate
      };
    })
    .filter(item => item.stats.totalGenerations > 0)
    .sort((a, b) => {
      // Sort by win rate, then by total generations
      if (Math.abs(a.winRate - b.winRate) > 0.01) {
        return b.winRate - a.winRate;
      }
      return b.stats.totalGenerations - a.stats.totalGenerations;
    });
}

export function resetRankings(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
}

