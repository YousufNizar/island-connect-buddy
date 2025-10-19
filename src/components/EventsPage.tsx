import { Calendar, MapPin, Users, Clock, Plus, Search, 
  Heart, Mountain, UtensilsCrossed, Bike, CircleUser, X, Share2, MessageCircle, Send, User, Instagram, Facebook, Twitter, Link, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedEvent, setSelectedEvent] = React.useState<typeof sampleEvents[0] | null>(null);
  const [showEventDialog, setShowEventDialog] = React.useState(false);
  const [showMessageDialog, setShowMessageDialog] = React.useState(false);
  const [groupMessage, setGroupMessage] = React.useState("");
  const [joinedEvents, setJoinedEvents] = React.useState<Set<number>>(new Set());
  const [showSharePopover, setShowSharePopover] = React.useState(false);
  const { toast } = useToast();
  
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

  const handleMessageHost = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowMessageDialog(true);
    toast({
      title: "Opening chat... 💬",
      description: `Loading messages for ${selectedEvent?.title}`,
    });
  };

  const handleSendMessage = () => {
    if (groupMessage.trim()) {
      toast({
        title: "Message sent! 💬",
        description: `Your message was sent to ${selectedEvent?.title} group`,
      });
      setShowMessageDialog(false);
      setGroupMessage("");
    }
  };

  const handleJoinEvent = (eventId: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    const newJoinedEvents = new Set(joinedEvents);
    const isCurrentlyJoined = newJoinedEvents.has(eventId);
    
    if (isCurrentlyJoined) {
      newJoinedEvents.delete(eventId);
      toast({
        title: "Left event 👋",
        description: "You've left this event. You can rejoin anytime!",
      });
    } else {
      newJoinedEvents.add(eventId);
      toast({
        title: "Successfully joined! 🎉",
        description: "You've successfully joined this event. Check your events list!",
      });
    }
    setJoinedEvents(newJoinedEvents);
  };

  const handleShare = (platform: string) => {
    if (!selectedEvent) return;
    
    const shareText = `Check out this event: ${selectedEvent.title} on ${selectedEvent.date} at ${selectedEvent.location}`;
    const shareUrl = `https://taprova.com/events/${selectedEvent.id}`;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        toast({
          title: "Copied to clipboard! 📋",
          description: "Share on Instagram by pasting in your story or post",
        });
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied! 🔗",
          description: "Event link copied to clipboard",
        });
        break;
    }
    
    setShowSharePopover(false);
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
                  <Button 
                    size="sm" 
                    className="btn-primary text-xs h-8 sm:h-9"
                    onClick={(e) => handleJoinEvent(event.id, e)}
                    variant={joinedEvents.has(event.id) ? "outline" : "default"}
                  >
                    {joinedEvents.has(event.id) ? "Joined ✓" : "Join Event"}
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
                  <Button variant="outline" size="sm" onClick={handleMessageHost}>
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
                  <Button 
                    className="flex-1 btn-primary"
                    onClick={(e) => handleJoinEvent(selectedEvent.id, e)}
                    variant={joinedEvents.has(selectedEvent.id) ? "outline" : "default"}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {joinedEvents.has(selectedEvent.id) ? "Joined ✓" : "Join Event"}
                  </Button>
                  
                  <Popover open={showSharePopover} onOpenChange={setShowSharePopover}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2" align="end">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold px-2 py-1">Share via</p>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10"
                          onClick={() => handleShare('whatsapp')}
                        >
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <span>WhatsApp</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10"
                          onClick={() => handleShare('instagram')}
                        >
                          <Instagram className="w-4 h-4 text-pink-600" />
                          <span>Instagram</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10"
                          onClick={() => handleShare('facebook')}
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                          <span>Facebook</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10"
                          onClick={() => handleShare('twitter')}
                        >
                          <Twitter className="w-4 h-4 text-sky-500" />
                          <span>Twitter</span>
                        </Button>
                        <div className="border-t my-1"></div>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10"
                          onClick={() => handleShare('copy')}
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy Link</span>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Group Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <MessageCircle className="w-6 h-6" />
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="flex-1 flex flex-col space-y-4 py-4">
              {/* Group Chat Area */}
              <div className="flex-1 bg-muted rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
                {/* Sample Messages */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 bg-background rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">{selectedEvent.host}</p>
                      <p className="text-sm">Hey everyone! Looking forward to this event! 🎉</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 bg-background rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">Sarah M.</p>
                      <p className="text-sm">Can't wait! What should we bring?</p>
                      <p className="text-xs text-muted-foreground mt-1">45 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 bg-background rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">Mike R.</p>
                      <p className="text-sm">Don't forget comfortable shoes and water! 💧</p>
                      <p className="text-xs text-muted-foreground mt-1">20 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{selectedEvent.participants} participants in this group</span>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={groupMessage}
                    onChange={(e) => setGroupMessage(e.target.value)}
                    rows={3}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowMessageDialog(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSendMessage}
                    disabled={!groupMessage.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsPage;
