import { X, Star, Shield, MapPin, Clock, DollarSign, Heart } from "lucide-react";
import { Location } from "@/data/locations";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { SustainabilityCard } from "./SustainabilityCard";
import { RatingForm } from "./RatingForm";
import { RatingsDisplay } from "./RatingsDisplay";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocationRatings } from "@/hooks/useLocationRatings";
import { useSubmitRating } from "@/hooks/useSubmitRating";
import { FirestoreService } from "@/services/firestoreService";

interface LocationDetailModalProps {
  location: Location;
  onClose: () => void;
}

const LocationDetailModal = ({ location, onClose }: LocationDetailModalProps) => {
  const [showRatingForm, setShowRatingForm] = useState(false);
  const { toast } = useToast();
  
  // Fetch real-time ratings data from Firebase
  const { data: ratingsData, isLoading: ratingsLoading, refresh } = useLocationRatings(location.id);
  const { submitRating, isLoading: isSubmitting } = useSubmitRating();

  const safetyIcons = {
    verified_safe: { icon: "✅", text: "Verified Safe Zone", color: "text-green-600" },
    caution: { icon: "⚠️", text: "Caution Advised", color: "text-yellow-600" },
    warning: { icon: "🚫", text: "Active Warning", color: "text-red-600" },
  };

  const safety = safetyIcons[location.safetyStatus];

  // Use Firebase data if available, otherwise use location defaults
  const displayRating = ratingsData?.averageRating || location.rating;
  const displayReviewCount = ratingsData?.totalReviews || location.reviewCount;
  const displayReviews = ratingsData?.reviews || [];
  const displaySustainabilityScore = ratingsData?.sustainabilityScore || location.sustainabilityScore;
  const displaySustainabilityMetrics = ratingsData?.metrics || location.breakdown;

  const handleRatingSubmit = async (rating: number, comment: string, category: string) => {
    // TODO: Get actual user ID from authentication context
    const userId = 'anonymous_user_' + Date.now(); // Temporary - replace with real auth
    
    const success = await submitRating(
      location.id,
      userId,
      rating,
      comment,
      category as 'safety' | 'eco_friendly' | 'cultural' | 'general'
    );
    
    if (success) {
      setShowRatingForm(false);
      // Refresh ratings to show the new review
      await refresh();
    }
  };

  const handleHelpful = async (reviewId: string) => {
    try {
      await FirestoreService.markRatingHelpful(reviewId);
      toast({
        title: "Thanks for the feedback!",
        description: "Your input helps other travelers.",
      });
      // Refresh to show updated helpful count
      await refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark review as helpful",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center animate-fade-in">
      <div className="bg-background w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
        {/* Header Image */}
        <div className="relative h-64">
          <img
            src={location.images[0]}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Rating */}
          <div className="mb-4">
            <h2 className="text-2xl font-heading font-bold mb-2">{location.name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{displayRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({displayReviewCount} {displayReviewCount === 1 ? 'review' : 'reviews'})
                </span>
                {ratingsLoading && (
                  <span className="text-xs text-muted-foreground ml-2">Loading...</span>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-lg mb-2">About</h3>
            <p className="text-muted-foreground">{location.description}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Opening Hours</p>
                <p className="text-sm text-muted-foreground">{location.openingHours}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Entry Fee</p>
                <p className="text-sm text-muted-foreground">{location.entryFee}</p>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Safety Status</h3>
            </div>
            <p className={`text-sm font-semibold ${safety.color} mb-1`}>
              {safety.icon} {safety.text}
            </p>
            <p className="text-sm text-muted-foreground">
              📍 Nearest Police: {location.nearestPoliceStation}
            </p>
          </div>

          {/* Enhanced Sustainability Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold mb-4">Sustainability & Impact</h2>
            <SustainabilityCard
              score={displaySustainabilityScore}
              metrics={displaySustainabilityMetrics}
            />
          </div>

          {/* Rating Form Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold">Share Your Experience</h2>
              {!showRatingForm && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowRatingForm(true)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              )}
            </div>
            
            {showRatingForm && (
              <RatingForm
                locationId={location.id}
                locationName={location.name}
                onSubmit={handleRatingSubmit}
                isLoading={isSubmitting}
              />
            )}
          </div>

          {/* Ratings Display Section */}
          <div className="mb-6">
            {ratingsLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading reviews...</p>
              </div>
            ) : (
              <RatingsDisplay
                averageRating={displayRating}
                totalReviews={displayReviewCount}
                reviews={displayReviews}
                onHelpful={handleHelpful}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-0 bg-background pt-4 pb-2 border-t">
            <Button className="flex-1" size="lg">
              <Heart className="w-5 h-5 mr-2" />
              Add to Trip
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowRatingForm(!showRatingForm)}
            >
              <Star className="w-5 h-5 mr-2" />
              {showRatingForm ? 'Cancel' : 'Rate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailModal;
