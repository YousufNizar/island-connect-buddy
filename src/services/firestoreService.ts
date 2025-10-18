// Firestore Service - Complete CRUD Operations
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { UserRating, LocationWithRatings, SustainabilityMetrics } from '@/types/ratings';
import { RatingService } from './ratingService';

export class FirestoreService {
  // Check if Firebase is configured
  private static isConfigured(): boolean {
    return db !== null;
  }

  // ===== RATINGS OPERATIONS =====

  // Submit a new rating
  static async submitRating(
    locationId: number,
    userId: string,
    rating: number,
    comment: string,
    category: 'safety' | 'eco_friendly' | 'cultural' | 'general'
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Firebase is not configured. Please add Firebase credentials to your .env file.');
    }
    
    try {
      const ratingsRef = collection(db!, 'ratings');
      const docRef = await addDoc(ratingsRef, {
        locationId,
        userId,
        rating,
        comment,
        category,
        timestamp: serverTimestamp(),
        helpful_count: 0,
        isVerified: false,
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  }

  // Get all ratings for a location
  static async getRatingsForLocation(locationId: number): Promise<UserRating[]> {
    if (!this.isConfigured()) {
      return [];
    }
    
    try {
      const q = query(
        collection(db!, 'ratings'),
        where('locationId', '==', locationId),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      } as UserRating));
    } catch (error) {
      console.error('Error fetching ratings:', error);
      return [];
    }
  }

  // Get user's rating for a location
  static async getUserRatingForLocation(
    locationId: number,
    userId: string
  ): Promise<UserRating | null> {
    if (!this.isConfigured()) {
      return null;
    }
    
    try {
      const q = query(
        collection(db!, 'ratings'),
        where('locationId', '==', locationId),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      } as UserRating;
    } catch (error) {
      console.error('Error fetching user rating:', error);
      return null;
    }
  }

  // Mark rating as helpful
  static async markRatingHelpful(ratingId: string): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('Firebase is not configured. Please add Firebase credentials to your .env file.');
    }
    
    try {
      const ratingRef = doc(db!, 'ratings', ratingId);
      await updateDoc(ratingRef, {
        helpful_count: increment(1),
      });
    } catch (error) {
      console.error('Error marking rating helpful:', error);
      throw error;
    }
  }

  // ===== SUSTAINABILITY OPERATIONS =====

  // Save sustainability metrics for a location
  static async saveSustainabilityMetrics(
    locationId: number,
    metrics: SustainabilityMetrics
  ): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('Firebase is not configured. Please add Firebase credentials to your .env file.');
    }
    
    try {
      const metricsRef = collection(db!, 'sustainability_metrics');
      const q = query(metricsRef, where('locationId', '==', locationId));
      const snapshot = await getDocs(q);

      const score = RatingService.calculateSustainabilityScore(metrics);
      const level = RatingService.getSustainabilityLevel(score);

      if (snapshot.empty) {
        // Create new
        await addDoc(metricsRef, {
          locationId,
          metrics,
          score,
          level,
          lastUpdated: serverTimestamp(),
        });
      } else {
        // Update existing
        const docRef = doc(db!, 'sustainability_metrics', snapshot.docs[0].id);
        await updateDoc(docRef, {
          metrics,
          score,
          level,
          lastUpdated: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error saving sustainability metrics:', error);
      throw error;
    }
  }

  // Get sustainability metrics for a location
  static async getSustainabilityMetrics(
    locationId: number
  ): Promise<{ score: number; metrics: SustainabilityMetrics; level: string } | null> {
    if (!this.isConfigured()) {
      return null;
    }
    
    try {
      const q = query(
        collection(db!, 'sustainability_metrics'),
        where('locationId', '==', locationId)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const data = snapshot.docs[0].data();
      return {
        score: data.score,
        metrics: data.metrics,
        level: data.level,
      };
    } catch (error) {
      console.error('Error fetching sustainability metrics:', error);
      return null;
    }
  }

  // Get all locations with ratings and sustainability
  static async getAllLocationsWithRatings(): Promise<LocationWithRatings[]> {
    if (!this.isConfigured()) {
      return [];
    }
    
    try {
      const ratingsRef = collection(db!, 'ratings');
      const snapshot = await getDocs(ratingsRef);

      // Group ratings by locationId
      const locationMap = new Map<number, UserRating[]>();
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const locationId = data.locationId;
        if (!locationMap.has(locationId)) {
          locationMap.set(locationId, []);
        }
        locationMap.get(locationId)!.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
        } as UserRating);
      });

      // Fetch sustainability metrics for each location
      const sustainabilityRef = collection(db!, 'sustainability_metrics');
      const sustSnapshot = await getDocs(sustainabilityRef);

      const sustainabilityMap = new Map<number, {
        score: number;
        level: string;
        metrics: SustainabilityMetrics;
      }>();
      sustSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        sustainabilityMap.set(data.locationId, {
          score: data.score,
          level: data.level,
          metrics: data.metrics,
        });
      });

      // Combine data
      const result: LocationWithRatings[] = [];
      locationMap.forEach((reviews, locationId) => {
        const rating = RatingService.calculateAverageRating(reviews);
        const sust = sustainabilityMap.get(locationId) || {
          score: 0,
          level: 'Low',
          metrics: {
            localOwnership: 0,
            ecoFriendly: 0,
            culturalValue: 0,
            touristImpact: 0,
          },
        };

        result.push({
          locationId,
          averageRating: rating,
          totalReviews: reviews.length,
          sustainabilityScore: sust.score,
          sustainabilityLevel: sust.level as 'High' | 'Moderate' | 'Low',
          metrics: sust.metrics,
          reviews,
        });
      });

      return result;
    } catch (error) {
      console.error('Error fetching all locations with ratings:', error);
      return [];
    }
  }

  // Get single location with all data
  static async getLocationWithRatings(locationId: number): Promise<LocationWithRatings | null> {
    try {
      const ratings = await this.getRatingsForLocation(locationId);
      const sustData = await this.getSustainabilityMetrics(locationId);

      const averageRating = RatingService.calculateAverageRating(ratings);

      return {
        locationId,
        averageRating,
        totalReviews: ratings.length,
        sustainabilityScore: sustData?.score || 0,
        sustainabilityLevel: (sustData?.level || 'Low') as 'High' | 'Moderate' | 'Low',
        metrics: sustData?.metrics || {
          localOwnership: 0,
          ecoFriendly: 0,
          culturalValue: 0,
          touristImpact: 0,
        },
        reviews: ratings,
      };
    } catch (error) {
      console.error('Error fetching location with ratings:', error);
      return null;
    }
  }

  // ===== ANALYTICS =====

  // Get top-rated locations
  static async getTopRatedLocations(limit: number = 10): Promise<LocationWithRatings[]> {
    const all = await this.getAllLocationsWithRatings();
    return all.sort((a, b) => b.averageRating - a.averageRating).slice(0, limit);
  }

  // Get most sustainable locations
  static async getMostSustainableLocations(limit: number = 10): Promise<LocationWithRatings[]> {
    const all = await this.getAllLocationsWithRatings();
    return all.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore).slice(0, limit);
  }

  // Get trending locations (recent ratings)
  static async getTrendingLocations(limit: number = 10): Promise<LocationWithRatings[]> {
    const all = await this.getAllLocationsWithRatings();
    return all
      .filter((loc) => loc.totalReviews > 0)
      .sort((a, b) => {
        const latestA = a.reviews[0]?.timestamp.getTime() || 0;
        const latestB = b.reviews[0]?.timestamp.getTime() || 0;
        return latestB - latestA;
      })
      .slice(0, limit);
  }
}

export default FirestoreService;
