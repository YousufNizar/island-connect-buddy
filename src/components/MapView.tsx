import { useState } from "react";
import { Search } from "lucide-react";
import { sampleLocations } from "@/data/locations";
import LocationDetailModal from "./LocationDetailModal";
import { LeafletMap } from "./LeafletMap";

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col h-screen">
      
      {/* Header */}
      <div className="bg-gradient-hero text-white px-4 pt-4 pb-4 shadow-lg z-10">
        <h1 className="text-2xl font-bold text-foreground mb-1 mt-2">
          Explore Sri Lanka
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          Discover hidden gems, local experiences, and unique adventures across the island • Connect with artisans, communities, and vibrant cultures
        </p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-[#122C34] focus:ring-offset-0"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1">
        <LeafletMap 
          selectedLocation={selectedLocation} 
          onLocationSelect={setSelectedLocation} 
        />
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <LocationDetailModal
          location={sampleLocations.find((l) => l.id === selectedLocation)!}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
};

export default MapView;
