// ============================================================
// RATING FORM COMPONENT
// ============================================================

import { useState } from 'react';
import { Star, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface RatingFormProps {
  locationId: number;
  locationName: string;
  onSubmit: (rating: number, comment: string, category: string) => void;
  isLoading?: boolean;
}

export const RatingForm = ({
  locationId,
  locationName,
  onSubmit,
  isLoading = false,
}: RatingFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState<'safety' | 'eco_friendly' | 'cultural' | 'general'>('general');
  const { toast } = useToast();

  const categories = [
    { value: 'safety', label: '🛡️ Safety', emoji: '🛡️' },
    { value: 'eco_friendly', label: '🌿 Eco-Friendly', emoji: '🌿' },
    { value: 'cultural', label: '🏛️ Cultural', emoji: '🏛️' },
    { value: 'general', label: '⭐ General', emoji: '⭐' },
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: 'Please select a rating',
        description: 'Rate this location to submit your review.',
        variant: 'destructive',
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: 'Comment too short',
        description: 'Please write at least 10 characters.',
        variant: 'destructive',
      });
      return;
    }

    onSubmit(rating, comment, category);
    setRating(0);
    setComment('');
    setCategory('general');
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-card">
      <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        Share Your Experience
      </h3>

      {/* Rating Category Selection */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-foreground mb-2 block">
          What type of rating is this?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value as typeof category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat.value
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.emoji} {cat.label.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Rate this location
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-all duration-150"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {rating > 0 && (
            <span>
              {rating === 5 && '🤩 Excellent!'}
              {rating === 4 && '😊 Good!'}
              {rating === 3 && '😐 Average'}
              {rating === 2 && '😟 Poor'}
              {rating === 1 && '😠 Terrible'}
            </span>
          )}
        </div>
      </div>

      {/* Comment Text Area */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-foreground mb-2 block">
          Your comment ({comment.length}/300)
        </label>
        <Textarea
          placeholder={`Tell others about your experience at ${locationName}...`}
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 300))}
          className="min-h-24 resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Minimum 10 characters. Be respectful and specific.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || rating === 0}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Review
      </Button>
    </div>
  );
};
