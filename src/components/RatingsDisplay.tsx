// ============================================================
// RATINGS DISPLAY COMPONENT
// ============================================================

import { Star, ThumbsUp, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RatingsDisplayProps {
  averageRating: number;
  totalReviews: number;
  reviews: Array<{
    id: string;
    userId: string;
    rating: number;
    comment: string;
    category: string;
    timestamp: Date;
    helpful_count: number;
  }>;
  onHelpful?: (reviewId: string) => void;
}

export const RatingsDisplay = ({
  averageRating,
  totalReviews,
  reviews,
  onHelpful,
}: RatingsDisplayProps) => {
  const categoryLabels = {
    safety: '🛡️ Safety',
    eco_friendly: '🌿 Eco-Friendly',
    cultural: '🏛️ Cultural',
    general: '⭐ General',
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg">Guest Reviews</h3>
          <Badge className="bg-primary/90 text-primary-foreground text-sm px-3 py-1">
            {totalReviews} reviews
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Based on {totalReviews} ratings</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-6">{stars}★</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Recent Reviews</h4>
        {reviews.length === 0 ? (
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.slice(0, 5).map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-lg p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Anonymous Traveler</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge className="bg-secondary/20 text-secondary-foreground text-xs">
                  {
                    categoryLabels[
                      review.category as keyof typeof categoryLabels
                    ]
                  }
                </Badge>
              </div>

              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-foreground mb-3">{review.comment}</p>

              <button
                onClick={() => onHelpful?.(review.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ThumbsUp className="w-3 h-3" />
                Helpful ({review.helpful_count})
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
