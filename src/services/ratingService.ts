// ============================================================
// RATING SERVICE - CALCULATION LOGIC
// ============================================================

import { UserRating, SustainabilityMetrics } from '@/types/ratings';

export class RatingService {
  // Calculate average rating for a location
  static calculateAverageRating(ratings: UserRating[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }

  // Calculate sustainability score (0-100)
  static calculateSustainabilityScore(metrics: SustainabilityMetrics): number {
    const weights = {
      localOwnership: 0.35,
      ecoFriendly: 0.30,
      culturalValue: 0.20,
      touristImpact: 0.15,
    };

    const score =
      metrics.localOwnership * weights.localOwnership +
      metrics.ecoFriendly * weights.ecoFriendly +
      metrics.culturalValue * weights.culturalValue +
      metrics.touristImpact * weights.touristImpact;

    return Math.round(score);
  }

  // Determine sustainability level
  static getSustainabilityLevel(score: number): 'High' | 'Moderate' | 'Low' {
    if (score >= 80) return 'High';
    if (score >= 50) return 'Moderate';
    return 'Low';
  }

  // Get sustainability color
  static getSustainabilityColor(level: string): string {
    const colors = {
      'High': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Moderate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Low': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[level as keyof typeof colors] || '';
  }

  // Get sustainability icon
  static getSustainabilityIcon(level: string): string {
    const icons = {
      'High': '🟢',
      'Moderate': '🟡',
      'Low': '🔴',
    };
    return icons[level as keyof typeof icons] || '';
  }
}
