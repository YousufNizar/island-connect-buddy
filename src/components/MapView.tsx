import { useState } from "react";
import { Search } from "lucide-react";
import { sampleLocations, categoryEmojis } from "@/data/locations";
import LocationDetailModal from "./LocationDetailModal";
import { LeafletMap } from "./LeafletMap";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["beach", "cultural", "food", "adventure", "hidden"];

  return (
    <div className="h-full flex flex-col" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 pb-8 shadow-lg">
        <h1 className="text-3xl font-heading font-bold mb-2">Explore Sri Lanka 🇱🇰</h1>
        <p className="text-white/90 text-sm mb-4">Discover sustainable & authentic experiences</p>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white text-foreground border-0 shadow-md"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <Button
            size="sm"
            variant={!selectedCategory ? "secondary" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="whitespace-nowrap"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? "secondary" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {categoryEmojis[cat as keyof typeof categoryEmojis]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 overflow-hidden">
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
