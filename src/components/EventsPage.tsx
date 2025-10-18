import { Calendar, MapPin, Users, Clock, Plus, Search, 
  Heart, Mountain, UtensilsCrossed, Bike, CircleUser, X, Share2, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React from "react";

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedEvent, setSelectedEvent] = React.useState<typeof sampleEvents[0] | null>(null);
  const [showEventDialog, setShowEventDialog] = React.useState(false);
  
  const sampleEvents = [
    {
      id: 1,
      title: "Beach Cleanup - Mirissa",
      host: "Emma K.",
      hostRating: 4.9,
      date: "Nov 20, 2025",
      time: "8:00 AM",
      location: "Mirissa Beach",
      category: "volunteer",
      participants: 12,
      maxParticipants: 20,
      description: "Let's make a difference! Bring gloves and bags. Coffee after!",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400"
    },
    {
      id: 2,
      title: "Sunrise Hike - Ella Rock",
      host: "Raj P.",
      hostRating: 4.9,
      date: "Oct 19, 2025",
      time: "5:00 AM",
      location: "Ella Rock Trailhead",
      category: "adventure",
      participants: 7,
      maxParticipants: 8,
      description: "Early morning hike to catch sunrise! Bring water and warm clothes.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    },
    {
      id: 3,
      title: "Food Tour - Colombo Fort",
      host: "Sarah K.",
      hostRating: 4.8,
      date: "Oct 18, 2025",
      time: "6:00 PM",
      location: "Fort Railway Station",
      category: "food",
      participants: 8,
      maxParticipants: 10,
      description: "Explore authentic Sri Lankan street food! Kottu, hoppers, and more!",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"
    },
    {
      id: 4,
      title: "Yoga & Meditation",
      host: "Lily C.",
      hostRating: 4.6,
      date: "Oct 19, 2025",
      time: "7:00 AM",
      location: "Mirissa Beach",
      category: "wellness",
      participants: 5,
      maxParticipants: 15,
      description: "Sunrise yoga session on the beach. All levels welcome! 🧘‍♀️",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400"
    }
  ];

  const categoryColors = {
    volunteer: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    adventure: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    food: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    wellness: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-3 sm:p-4 pb-2 sm:pb-3 shadow-lg">
        <div className="p-1 sm:p-2 space-y-1 sm:space-y-2">
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground mb-0.5">
              Sri Lankan Cultural Events
            </h1>
            <p className="text-xs text-muted-foreground mb-1">
              Experience vibrant traditions • Discover celebrations across the island
            </p>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold mb-0.5">Events & Meetups</h1>
            <p className="text-white/90 text-xs">Join group activities & make friends</p>
          </div>

          <div className="relative mt-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground
                        focus:outline-none focus:ring-2 focus:ring-[#122C34] focus:ring-offset-0"
            />

          </div>


        </div>
      </div>


      {/* Stats Bar */}
      <div className="bg-white border-b px-2 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-around items-center max-w-4xl mx-auto gap-2">
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              {sampleEvents.filter(event => new Date(event.date) > new Date()).length}
            </span>
            <span className="text-[10px] sm:text-sm text-gray-600 text-center">Upcoming</span>
          </div>
          <div className="w-px h-8 sm:h-12 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              {sampleEvents.filter(event => new Date(event.date) <= new Date()).length}
            </span>
            <span className="text-[10px] sm:text-sm text-gray-600 text-center">Past</span>
          </div>
          <div className="w-px h-8 sm:h-12 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              {sampleEvents.length}
            </span>
            <span className="text-[10px] sm:text-sm text-gray-600 text-center">Total</span>
          </div>
          <div className="w-px h-8 sm:h-12 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              {sampleEvents.reduce((total, event) => total + event.participants, 0)}
            </span>
            <span className="text-[10px] sm:text-sm text-gray-600 text-center">Participants</span>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white border-b px-3 sm:px-6 py-2 sm:py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("all")}
          className="rounded-full text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
        >
          <CircleUser className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          All Events
        </Button>
        {Object.keys(categoryColors).map((category) => {
          const getCategoryIcon = (cat: string) => {
            switch (cat) {
              case 'volunteer':
                return <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />;
              case 'adventure':
                return <Mountain className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />;
              case 'food':
                return <UtensilsCrossed className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />;
              case 'wellness':
                return <Bike className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />;
              default:
                return null;
            }
          };
          
          return (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full flex items-center text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                activeCategory === category ? categoryColors[category] : ""
              }`}
            >
              {getCategoryIcon(category)}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          );
        })}
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {sampleEvents
          .filter(event => {
            const matchesCategory = activeCategory === "all" || event.category === activeCategory;
            const matchesSearch = searchQuery === "" || 
              event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              event.location.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
          })
          .map((event) => (
          <div
            key={event.id}
            onClick={() => {
              setSelectedEvent(event);
              setShowEventDialog(true);
            }}
            className="bg-card rounded-xl shadow-card border border-border overflow-hidden card-hover cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Image */}
              <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-3 sm:p-4 pt-0 sm:pt-4 sm:pr-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                  <h3 className="font-heading font-bold text-base sm:text-lg">{event.title}</h3>
                  <Badge className={`${categoryColors[event.category as keyof typeof categoryColors]} text-xs whitespace-nowrap self-start`}>
                    {event.category}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{event.date} @ {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{event.participants}/{event.maxParticipants} joined</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Hosted by <span className="font-semibold">{event.host}</span> ⭐ {event.hostRating}
                  </div>
                  <Button size="sm" className="btn-primary text-xs h-8 sm:h-9">
                    Join Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Create Button */}
      <Button
        size="lg"
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-float animate-pulse-glow z-40"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      {/* Event Detail Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          {selectedEvent && (
            <>
              {/* Event Image Header */}
              <div className="relative h-64 w-full">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge 
                  className={`absolute top-4 right-4 ${categoryColors[selectedEvent.category as keyof typeof categoryColors]}`}
                >
                  {selectedEvent.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading">
                    {selectedEvent.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Host Info */}
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {selectedEvent.host.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Hosted by {selectedEvent.host}</p>
                    <p className="text-sm text-muted-foreground">⭐ {selectedEvent.hostRating} rating</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{selectedEvent.date}</p>
                        <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{selectedEvent.location}</p>
                        <Button variant="link" className="h-auto p-0 text-xs text-primary">
                          View on map
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {selectedEvent.participants}/{selectedEvent.maxParticipants} participants
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(selectedEvent.participants, 4))].map((_, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-400 to-purple-400"
                              />
                            ))}
                            {selectedEvent.participants > 4 && (
                              <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-semibold">
                                +{selectedEvent.participants - 4}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">About this event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* What to Bring */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">What to bring</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Water bottle</Badge>
                    <Badge variant="secondary">Comfortable shoes</Badge>
                    <Badge variant="secondary">Sun protection</Badge>
                    <Badge variant="secondary">Camera</Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 btn-primary">
                    <Users className="w-4 h-4 mr-2" />
                    Join Event
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsPage;
