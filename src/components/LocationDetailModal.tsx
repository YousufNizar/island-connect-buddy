import { X, Star, Shield, MapPin, Clock, DollarSign, Heart } from "lucide-react";
import { Location } from "@/data/locations";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface LocationDetailModalProps {
  location: Location;
  onClose: () => void;
}

const LocationDetailModal = ({ location, onClose }: LocationDetailModalProps) => {
  const safetyIcons = {
    verified_safe: { icon: "✅", text: "Verified Safe Zone", color: "text-green-600" },
    caution: { icon: "⚠️", text: "Caution Advised", color: "text-yellow-600" },
    warning: { icon: "🚫", text: "Active Warning", color: "text-red-600" },
  };

  const safety = safetyIcons[location.safetyStatus];

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
                <span className="font-semibold">{location.rating}</span>
                <span className="text-sm text-muted-foreground">({location.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Sustainability Score */}
          <div className="bg-gradient-sustainability text-white rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">🌿 Sustainability Score</h3>
              <span className="text-3xl font-bold">{location.sustainabilityScore}/100</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🏘️ Local Ownership</span>
                  <span>{location.breakdown.localOwnership}%</span>
                </div>
                <Progress value={location.breakdown.localOwnership} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>♻️ Eco-Friendly</span>
                  <span>{location.breakdown.ecoFriendly}%</span>
                </div>
                <Progress value={location.breakdown.ecoFriendly} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🎭 Cultural Value</span>
                  <span>{location.breakdown.culturalValue}%</span>
                </div>
                <Progress value={location.breakdown.culturalValue} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>👥 Tourist Impact</span>
                  <span>{location.breakdown.touristImpact}%</span>
                </div>
                <Progress value={location.breakdown.touristImpact} className="h-2" />
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              <Heart className="w-5 h-5 mr-2" />
              Add to Trip
            </Button>
            <Button variant="outline" size="lg">
              <Star className="w-5 h-5 mr-2" />
              Rate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailModal;
