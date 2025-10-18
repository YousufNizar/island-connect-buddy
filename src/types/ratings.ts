// ============================================================
// DATA MODELS & TYPES
// ============================================================

export interface UserRating {
  id: string;
  locationId: number;
  userId: string;
  rating: number; // 1-5 stars
  comment: string;
  timestamp: Date;
  category: 'safety' | 'eco_friendly' | 'cultural' | 'general';
  helpful_count: number;
}

export interface SustainabilityMetrics {
  localOwnership: number; // 0-100
  ecoFriendly: number; // 0-100
  culturalValue: number; // 0-100
  touristImpact: number; // 0-100
}

export interface LocationWithRatings {
  locationId: number;
  averageRating: number;
  totalReviews: number;
  sustainabilityScore: number;
  sustainabilityLevel: 'High' | 'Moderate' | 'Low';
  metrics: SustainabilityMetrics;
  reviews: UserRating[];
  userRating?: number; // Current user's rating
}
