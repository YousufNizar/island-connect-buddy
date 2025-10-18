import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const EventsPage = () => {
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
      <div className="bg-gradient-hero text-white p-6 pb-8 shadow-lg">
        <h1 className="text-3xl font-heading font-bold mb-2">Events & Meetups</h1>
        <p className="text-white/90 text-sm">Join group activities & make friends</p>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            className="bg-card rounded-xl shadow-card border border-border overflow-hidden card-hover"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 pr-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-lg">{event.title}</h3>
                  <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                    {event.category}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} @ {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants}/{event.maxParticipants} joined</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Hosted by <span className="font-semibold">{event.host}</span> ⭐ {event.hostRating}
                  </div>
                  <Button size="sm" className="btn-primary">
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
        className="fixed bottom-24 right-6 rounded-full w-14 h-14 shadow-float animate-pulse-glow z-40"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default EventsPage;
