import { useState } from "react";
import { Search, Filter, Star, Clock, Users, MapPin, Award, Map, List, Coffee, Palette, Leaf, Soup, Hammer, Archive  } from "lucide-react";
import { experiences, artisans } from "@/data/experiences";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExperienceDetailModal from "./ExperienceDetailModal";

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const categories = [
    { id: "all", label: "All", icon: List },
    { id: "tea", label: "Tea", icon: Coffee },
    { id: "batik", label: "Batik", icon: Palette },
    { id: "coconut", label: "Coconut", icon: Leaf },
    { id: "cuisine", label: "Cuisine", icon: Soup },
    { id: "pottery", label: "Pottery", icon: Archive  },
    { id: "woodcraft", label: "Woodcraft", icon: Hammer },
  ];

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCategory = selectedCategory === "all" || exp.category === selectedCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getArtisan = (artisanId: string) => {
    return artisans.find(a => a.id === artisanId);
  };

  const selectedExp = experiences.find(exp => exp.id === selectedExperience);

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Header */}
      <div className="bg-[#F3F3F3] border-b border-border sticky top-0 z-40">
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Sri Lankan Marketplaces
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              Learn from verified local artisans • Hands-on cultural experiences
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-12 sm:pr-14 py-2 sm:py-3 text-sm sm:text-base bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground
                        focus:outline-none focus:ring-2 focus:ring-[#122C34] focus:ring-offset-0"
            />

            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon; // assign the component
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-1 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#122C34] text-white shadow-md scale-105 font-semibold"
                      : "bg-white border border-[#122C34]/20 text-[#122C34] hover:bg-[#122C34]/5"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" /> {/* render as component */}
                  <span className="text-xs sm:text-sm font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mt-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
            >
              <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              List View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Map className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Map View
            </Button>
          </div>
        </div>
      </div>

      {/* Map View Section */}
      {viewMode === "map" && (
        <div className="h-[calc(100vh-240px)] sm:h-[calc(100vh-280px)] relative">
          <Card className="overflow-hidden h-full m-3 sm:m-4">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-[#F3F3F3]">
                {/* Map Header */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-3 sm:p-4 z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm sm:text-base font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      Artisan Locations Map
                    </h3>
                    <Badge className="bg-white/90 text-foreground hover:bg-white text-xs sm:text-sm">
                      {filteredExperiences.length} experiences
                    </Badge>
                  </div>
                </div>

                {/* Map Visualization */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                  <div className="relative w-full h-full max-w-2xl mx-auto">
                    {/* Sri Lanka island outline representation */}
                    <svg viewBox="0 0 400 500" className="w-full h-full opacity-30">
                      <path
                        d="M200 50 L250 100 L280 150 L290 200 L280 250 L250 300 L220 350 L180 380 L150 350 L120 280 L110 200 L120 150 L150 100 Z"
                        fill="currentColor"
                        className="text-primary"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Artisan location pins */}
                    {filteredExperiences.map((exp, index) => {
                      // Distribute pins across the map based on actual data or pseudo-random positions
                      const positions = [
                        { top: '15%', left: '45%' },
                        { top: '25%', left: '55%' },
                        { top: '35%', left: '40%' },
                        { top: '45%', left: '60%' },
                        { top: '20%', left: '35%' },
                        { top: '40%', left: '50%' },
                        { top: '30%', left: '65%' },
                        { top: '50%', left: '45%' },
                        { top: '55%', left: '55%' },
                        { top: '60%', left: '40%' },
                        { top: '65%', left: '50%' },
                        { top: '70%', left: '45%' },
                      ];
                      const pos = positions[index % positions.length];
                      const artisan = getArtisan(exp.artisanId);
                      
                      return (
                        <div
                          key={exp.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                          style={{ top: pos.top, left: pos.left }}
                          onClick={() => setSelectedExperience(exp.id)}
                        >
                          <div className="relative">
                            {/* Pin */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center shadow-xl animate-pulse group-hover:scale-125 transition-all border-2 sm:border-4 border-white dark:border-gray-800">
                              <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
                            </div>
                            {/* Tooltip */}
                            <div className="absolute -top-28 sm:-top-32 left-1/2 -translate-x-1/2 bg-card border-2 border-border rounded-xl p-2 sm:p-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all w-56 sm:w-64 pointer-events-none z-30">
                              <div className="flex gap-2">
                                <img 
                                  src={exp.images[0]} 
                                  alt={exp.title}
                                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs sm:text-sm font-semibold line-clamp-2">{exp.title}</div>
                                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                                    by {artisan?.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs sm:text-sm font-bold text-primary">${exp.price}</span>
                                    <span className="flex items-center gap-1 text-[10px] sm:text-xs">
                                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-500 text-yellow-500" />
                                      {exp.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Map Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                  <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      Click pins to view details
                    </p>
                    <p className="text-[10px] sm:text-xs opacity-75">
                      {filteredExperiences.length} artisans shown
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* List View Section */}
      {viewMode === "list" && (
        <>
          {/* Featured Section */}
          <div className="p-3 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-foreground">
                🌟 Featured Experiences
              </h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-2 sm:p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">Verified Artisans</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-2 sm:p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">4.8★</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">Avg. Rating</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardContent className="p-2 sm:p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">Happy Tourists</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Experience Cards */}
          <div className="p-3 sm:p-4 pb-20 sm:pb-24">
            <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 sm:mb-4">
              {filteredExperiences.length} experiences available
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {filteredExperiences.map((experience) => {
          const artisan = getArtisan(experience.artisanId);
          if (!artisan) return null;

          return (
            <Card
              key={experience.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group animate-fade-in"
              onClick={() => setSelectedExperience(experience.id)}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={experience.images[0]}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-background/90 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-[10px] sm:text-xs font-semibold">{experience.rating}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">({experience.reviewCount})</span>
                </div>
                {experience.verified && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                      <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Verified
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                    🌿 {experience.sustainabilityScore}% Sustainable
                  </Badge>
                </div>
              </div>

              <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Title */}
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 line-clamp-2">
                    {experience.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {experience.shortDescription}
                  </p>
                </div>

                {/* Artisan Info */}
                <div className="flex items-center gap-2">
                  <img
                    src={artisan.photo}
                    alt={artisan.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1">
                      {artisan.name}
                      {artisan.verified && (
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      {artisan.yearsOfExperience} years • {artisan.experiencesHosted} hosted
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-border">
                  <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground">
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {experience.duration}m
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      {experience.maxParticipants}
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {experience.location.distanceKm}km
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {experience.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-foreground">${experience.price}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground"> / person</span>
                  </div>
                  <Button size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
            })}
            </div>

            {filteredExperiences.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="text-3xl sm:text-4xl mb-4">🔍</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No experiences found</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Experience Detail Modal */}
      {selectedExp && (
        <ExperienceDetailModal
          experience={selectedExp}
          artisan={getArtisan(selectedExp.artisanId)!}
          isOpen={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </div>
  );
};

export default MarketplacePage;
