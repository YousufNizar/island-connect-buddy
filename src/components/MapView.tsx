import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { sampleLocations, categoryEmojis, categoryColors } from "@/data/locations";
import LocationCard from "./LocationCard";
import LocationDetailModal from "./LocationDetailModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["beach", "cultural", "food", "adventure", "hidden"];

  const filteredLocations = sampleLocations.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || loc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
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

      {/* Location Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => setSelectedLocation(location.id)}
            />
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No locations found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Button
        size="lg"
        className="fixed bottom-24 right-6 rounded-full w-14 h-14 shadow-float animate-pulse-glow z-40"
      >
        <Plus className="w-6 h-6" />
      </Button>

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
