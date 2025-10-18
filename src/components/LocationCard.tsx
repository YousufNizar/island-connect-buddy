import { Star, MapPin } from "lucide-react";
import { Location, categoryEmojis, categoryColors } from "@/data/locations";
import { Badge } from "./ui/badge";

interface LocationCardProps {
  location: Location;
  onClick: () => void;
}

const LocationCard = ({ location, onClick }: LocationCardProps) => {
  const getSustainabilityLevel = (score: number) => {
    if (score >= 80) return { text: "High", class: "sustainability-high" };
    if (score >= 50) return { text: "Moderate", class: "sustainability-moderate" };
    return { text: "Low", class: "sustainability-low" };
  };

  const sustainability = getSustainabilityLevel(location.sustainabilityScore);

  return (
    <div
      onClick={onClick}
      className="card-hover cursor-pointer rounded-xl overflow-hidden bg-card shadow-card border border-border group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={location.images[0]}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[location.category]}`}>
            {categoryEmojis[location.category]} {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
          </span>
          <span className={sustainability.class}>
            🌿 {location.sustainabilityScore}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{location.rating}</span>
          <span className="text-xs opacity-90">({location.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-2 line-clamp-1">{location.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{location.description}</p>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>Click to view details</span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
