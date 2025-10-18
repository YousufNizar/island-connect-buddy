import { useState } from "react";
import { Search, Filter, Star, Clock, Users, MapPin, Award, ChevronRight } from "lucide-react";
import { experiences, artisans } from "@/data/experiences";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExperienceDetailModal from "./ExperienceDetailModal";

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All", icon: "🎨" },
    { id: "tea", label: "Tea", icon: "🍵" },
    { id: "batik", label: "Batik", icon: "🎨" },
    { id: "coconut", label: "Coconut", icon: "🥥" },
    { id: "cuisine", label: "Cuisine", icon: "🍜" },
    { id: "pottery", label: "Pottery", icon: "🏺" },
    { id: "woodcraft", label: "Woodcraft", icon: "🪵" },
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-lg bg-card/95">
        <div className="p-4 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Authentic Sri Lankan Marketplace
            </h1>
            <p className="text-sm text-muted-foreground">
              Learn from verified local artisans • Hands-on cultural experiences
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            🌟 Featured Experiences
          </h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            See all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground mt-1">Verified Artisans</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">4.8★</div>
              <div className="text-xs text-muted-foreground mt-1">Avg. Rating</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
              <div className="text-xs text-muted-foreground mt-1">Happy Tourists</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="p-4 space-y-4 pb-24">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {filteredExperiences.length} experiences available
        </h3>

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
              <div className="relative h-48 overflow-hidden">
                <img
                  src={experience.images[0]}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-semibold">{experience.rating}</span>
                  <span className="text-xs text-muted-foreground">({experience.reviewCount})</span>
                </div>
                {experience.verified && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Verified
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                    🌿 {experience.sustainabilityScore}% Sustainable
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Title */}
                <div>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {experience.shortDescription}
                  </p>
                </div>

                {/* Artisan Info */}
                <div className="flex items-center gap-2">
                  <img
                    src={artisan.photo}
                    alt={artisan.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground flex items-center gap-1">
                      {artisan.name}
                      {artisan.verified && (
                        <Award className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {artisan.yearsOfExperience} years • {artisan.experiencesHosted} hosted
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experience.duration}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {experience.maxParticipants} max
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {experience.location.distanceKm}km
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {experience.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-bold text-foreground">${experience.price}</span>
                    <span className="text-sm text-muted-foreground"> / person</span>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No experiences found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

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
