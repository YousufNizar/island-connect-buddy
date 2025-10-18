// Custom Hook: useSubmitRating
import { useState } from 'react';
import { FirestoreService } from '@/services/firestoreService';
import { useToast } from './use-toast';

export const useSubmitRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submitRating = async (
    locationId: number,
    userId: string,
    rating: number,
    comment: string,
    category: 'safety' | 'eco_friendly' | 'cultural' | 'general'
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      await FirestoreService.submitRating(locationId, userId, rating, comment, category);
      toast({
        title: 'Success!',
        description: 'Your review has been submitted',
      });
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit review';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitRating, isLoading };
};
