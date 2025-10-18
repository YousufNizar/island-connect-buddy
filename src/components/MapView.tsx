import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { sampleLocations } from "@/data/locations";
import LocationDetailModal from "./LocationDetailModal";
import { LeafletMap } from "./LeafletMap";

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) {
      return sampleLocations;
    }

    const query = searchQuery.toLowerCase().trim();
    return sampleLocations.filter(location => 
      location.name.toLowerCase().includes(query) ||
      location.description.toLowerCase().includes(query) ||
      location.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-screen">
      
      {/* Header */}
      <div className="bg-gradient-hero text-white px-4 pt-4 pb-4 shadow-lg z-10">
        <div className="flex items-center gap-3 mb-1 mt-2">
          <img 
            src="/logo.png" 
            alt="TAPROVA Logo" 
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold text-foreground">
            Explore Sri Lanka
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Discover hidden gems, local experiences, and unique adventures across the island • Connect with artisans, communities, and vibrant cultures
        </p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search locations, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-[#122C34] focus:ring-offset-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results Counter */}
        {searchQuery && (
          <div className="text-xs text-muted-foreground mt-2">
            {filteredLocations.length === 0 ? (
              <span className="text-destructive">No locations found for "{searchQuery}"</span>
            ) : filteredLocations.length === sampleLocations.length ? (
              <span>Showing all {sampleLocations.length} locations</span>
            ) : (
              <span className="text-primary font-medium">
                Found {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1">
        <LeafletMap 
          selectedLocation={selectedLocation} 
          onLocationSelect={setSelectedLocation}
          filteredLocations={filteredLocations}
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
