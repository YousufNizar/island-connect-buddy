// Custom Hook: useLocationRatings
import { useState, useEffect } from 'react';
import { FirestoreService } from '@/services/firestoreService';
import { LocationWithRatings } from '@/types/ratings';
import { useToast } from './use-toast';
import { isFirebaseConfigured } from '@/config/firebase';

export const useLocationRatings = (locationId: number) => {
  const [data, setData] = useState<LocationWithRatings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      // Skip Firebase if not configured
      if (!isFirebaseConfigured) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await FirestoreService.getLocationWithRatings(locationId);
        setData(result);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load ratings';
        setError(errorMessage);
        console.error('Error fetching ratings:', errorMessage);
        // Don't show toast for missing Firebase config
        if (isFirebaseConfigured) {
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [locationId, toast]);

  const refresh = async () => {
    if (!isFirebaseConfigured) return;
    
    try {
      setIsLoading(true);
      const result = await FirestoreService.getLocationWithRatings(locationId);
      setData(result);
      setError(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh ratings';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refresh };
};
