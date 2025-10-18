import { useState } from "react";
import { Heart, X, MessageCircle, MapPin, Sparkles, Filter } from "lucide-react";
import { sampleUsers } from "@/data/users";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

const ConnectFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(true);
  const { toast } = useToast();

  const filteredUsers = sampleUsers.filter(user => 
    !showVerifiedOnly || user.verified
  );

  const currentUser = filteredUsers[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      toast({
        title: "Connect request sent! 💚",
        description: `If ${currentUser.name} accepts, you can start chatting!`,
      });
    }

    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "That's everyone for now!",
        description: "Check back later for more travelers ✨",
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold mb-2">No more travelers right now</h2>
          <p className="text-muted-foreground">Check back later for new connections!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-border bg-card">
        <div>
          <h1 className="text-2xl font-heading font-bold">Connect</h1>
          <p className="text-sm text-muted-foreground">Find travel buddies & friends</p>
        </div>
        <Button
          size="sm"
          variant={showVerifiedOnly ? "default" : "outline"}
          onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Verified
        </Button>
      </div>

      {/* Profile Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-float overflow-hidden animate-scale-in">
            {/* Photo */}
            <div className="relative h-96">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Online Status */}
              {currentUser.online && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 px-3 py-1.5 rounded-full">
                  <span className="online-indicator"></span>
                  <span className="text-xs font-semibold">Online</span>
                </div>
              )}

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-3xl font-heading font-bold">{currentUser.name}, {currentUser.age}</h2>
                  {currentUser.verified && (
                    <Badge className="verified-badge bg-blue-600 text-white">
                      ✓
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.currentLocation.distanceKm} km away · {currentUser.currentLocation.city}</span>
                </div>

                <div className="flex gap-2 mb-3">
                  {currentUser.lookingFor.map((type) => (
                    <Badge key={type} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {type === "friends" ? "🤝 Friends" : "🧳 Travel Buddy"}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.slice(0, 4).map((interest) => (
                    <Badge key={interest} variant="outline" className="text-white border-white/30">
                      {interest}
                    </Badge>
                  ))}
                  {currentUser.interests.length > 4 && (
                    <Badge variant="outline" className="text-white border-white/30">
                      +{currentUser.interests.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-6">
              <p className="text-foreground mb-4">{currentUser.bio}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold">🗣️ Languages:</span>
                  <span>{currentUser.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold">📅 Traveling:</span>
                  <span>{new Date(currentUser.travelDates.from).toLocaleDateString()} - {new Date(currentUser.travelDates.to).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold">⭐ Rating:</span>
                  <span>{currentUser.rating}/5.0 ({currentUser.connectionCount} connections)</span>
                </div>
              </div>

              {currentUser.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentUser.badges.map((badge) => (
                    <Badge key={badge} className="bg-primary/10 text-primary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 border-2 hover:bg-destructive hover:text-white hover:border-destructive"
              onClick={() => handleSwipe("left")}
            >
              <X className="w-8 h-8" />
            </Button>

            <Button
              size="lg"
              className="rounded-full w-20 h-20 bg-primary text-white shadow-float"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="w-10 h-10" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 border-2 hover:bg-secondary hover:border-secondary"
            >
              <MessageCircle className="w-8 h-8" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {currentIndex + 1} of {filteredUsers.length} travelers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectFeed;
