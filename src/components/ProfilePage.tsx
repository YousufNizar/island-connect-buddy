import { User, MapPin, Star, Award, Settings, LogOut, Calendar, Users, Clock, MapPinIcon, MessageCircle, Send, Heart, Share2, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import TravelJournal from "./TravelJournal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ConfirmDialog";


// Sample events data
const upcomingEvents = [
  {
    id: 1,
    title: "Sunrise Hike at Adam's Peak",
    date: "Oct 25, 2025",
    time: "4:00 AM",
    location: "Adam's Peak, Nuwara Eliya",
    participants: 12,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    status: "Joined",
  },
  {
    id: 2,
    title: "Cooking Class: Traditional Sri Lankan Cuisine",
    date: "Oct 28, 2025",
    time: "10:00 AM",
    location: "Galle Fort",
    participants: 8,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400",
    status: "Joined",
  },
  {
    id: 3,
    title: "Beach Cleanup & Snorkeling",
    date: "Nov 2, 2025",
    time: "7:00 AM",
    location: "Mirissa Beach",
    participants: 15,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    status: "Joined",
  },
];

const pastEvents = [
  {
    id: 4,
    title: "Tea Plantation Tour",
    date: "Oct 10, 2025",
    time: "9:00 AM",
    location: "Ella",
    participants: 10,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
    status: "Completed",
  },
  {
    id: 5,
    title: "Temple Visit & Meditation",
    date: "Oct 5, 2025",
    time: "6:00 AM",
    location: "Kandy",
    participants: 20,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400",
    status: "Completed",
  },
];

const ProfilePage = () => {
  const [showEventsDialog, setShowEventsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showMessageGroup, setShowMessageGroup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null);
  const [groupMessage, setGroupMessage] = useState("");
  const [savedEvents, setSavedEvents] = useState<Set<number>>(new Set());
  const [joinedEvents, setJoinedEvents] = useState<Set<number>>(new Set([1, 2, 3])); // Pre-joined events
  const [profileData, setProfileData] = useState({
    name: "You",
    bio: "Exploring Sri Lanka 🌴 | Love hiking & beaches | Looking to connect with fellow travelers",
    location: "Colombo, Sri Lanka",
    languages: "English, Sinhala",
    interests: "Hiking, Photography, Food, Culture",
  });
  const { toast } = useToast();

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
    toast({
      title: "Profile updated! ✅",
      description: "Your changes have been saved successfully.",
    });
    setShowEditDialog(false);
  };

  const handleViewDetails = (event: typeof upcomingEvents[0]) => {
    console.log("Opening event details for:", event.title);
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleMessageGroup = (event: typeof upcomingEvents[0], e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("Opening message group for:", event.title);
    setSelectedEvent(event);
    setShowMessageGroup(true);
    setGroupMessage("");
    toast({
      title: "Opening group chat... 💬",
      description: `Loading messages for ${event.title}`,
    });
  };

  const handleDelete = () => {
    console.log("Item deleted ✅");
  };

  const handleSendMessage = () => {
    if (groupMessage.trim()) {
      toast({
        title: "Message sent! 💬",
        description: `Your message was sent to ${selectedEvent?.title} group`,
      });
      setShowMessageGroup(false);
      setGroupMessage("");
    }
  };

  const handleJoinEvent = (eventId: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("Join/Leave event clicked for ID:", eventId);
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
        title: "Joined event! 🎉",
        description: "You've successfully joined this event. Check your events list!",
      });
    }
    setJoinedEvents(newJoinedEvents);
  };

  const handleSaveEvent = (eventId: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("Save/Unsave event clicked for ID:", eventId);
    const newSavedEvents = new Set(savedEvents);
    const isCurrentlySaved = newSavedEvents.has(eventId);
    
    if (isCurrentlySaved) {
      newSavedEvents.delete(eventId);
      toast({
        title: "Removed from saved 💔",
        description: "Event removed from your saved list",
      });
    } else {
      newSavedEvents.add(eventId);
      toast({
        title: "Event saved! ❤️",
        description: "Added to your saved events. Find it in your profile!",
      });
    }
    setSavedEvents(newSavedEvents);
  };

  const handleShareEvent = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("Share event clicked");
    if (selectedEvent) {
      const shareUrl = `https://island-connect.com/events/${selectedEvent.id}`;
      navigator.clipboard?.writeText(shareUrl).catch(() => {
        console.log("Clipboard not available, using fallback");
      });
      toast({
        title: "Share link copied! 🔗",
        description: `Link for "${selectedEvent.title}" copied to clipboard`,
      });
    }
  };

  console.log("showEditDialog:", showEditDialog);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/90 to-primary/50 text-white p-6 pb-12 shadow-lg relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold tracking-tight">Profile</h1>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-xl ring-4 ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
              alt="Profile"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl font-heading font-bold tracking-tight">You</h2>
              <Badge className="bg-blue-500/20 text-white border border-white/20 backdrop-blur-sm">
                <span className="mr-1">✓</span> Verified
              </Badge>
            </div>
            <p className="text-white/90 text-base font-medium">Exploring Sri Lanka</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 px-6 py-8 bg-background border-b border-border -mt-6 rounded-t-3xl relative shadow-sm">
        <div className="text-center space-y-2">
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-sm text-muted-foreground font-medium">Places Visited</p>
        </div>
        <div className="text-center space-y-2 border-x border-border">
          <p className="text-3xl font-bold text-primary">8</p>
          <p className="text-sm text-muted-foreground font-medium">Reviews</p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-3xl font-bold text-primary">82</p>
          <p className="text-sm text-muted-foreground font-medium">Eco Score</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Travel Journal */}
        <TravelJournal />

        {/* Badges */}
        <div>
          <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-4 py-2">
              🌿 Eco Warrior
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2">
              ✓ Verified Traveler
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-4 py-2">
              📸 Explorer
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-4 py-2">
              ⭐ Top Reviewer
            </Badge>
          </div>
        </div>

        {/* Connect Stats */}
        <div>
          <h3 className="font-heading font-semibold text-lg mb-3">Connect Activity</h3>
          <div className="bg-card rounded-xl p-4 border border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Connections Made</span>
              <span className="font-semibold">23 travelers</span>
            </div>
            <button
              onClick={() => setShowEventsDialog(true)}
              className="flex justify-between items-center w-full hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors"
            >
              <span className="text-sm text-muted-foreground">Events Joined</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">5 meetups</span>
                <Calendar className="w-4 h-4 text-primary" />
              </div>
            </button>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Connection Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div>
          <h3 className="font-heading font-semibold text-lg mb-3">Settings</h3>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle app appearance</p>
              </div>
              <Switch />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Profile Visible</p>
                <p className="text-xs text-muted-foreground">Show in Connect feed</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Verified Only</p>
                <p className="text-xs text-muted-foreground">Only show verified users</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pb-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full justify-start"
            onClick={() => {
              console.log("Edit Profile clicked!");
              setShowEditDialog(true);
            }}
          >
            <User className="w-5 h-5 mr-3" />
            Edit Profile
          </Button>
          <Button variant="outline" size="lg" className="w-full justify-start"  onClick={() => setOpen(true)}>
            <MapPin className="w-5 h-5 mr-3" />
            My Saved Places
          </Button>
          <Button variant="outline" size="lg" className="w-full justify-start text-destructive">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Save Location"
        description="This action will save your location. Are you sure you want to proceed?"
        onConfirm={handleDelete}
        confirmText="Confirm"
        cancelText="Cancel"
      />

      {/* Events Dialog */}
      <Dialog open={showEventsDialog} onOpenChange={setShowEventsDialog}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-6 h-6 text-primary" />
              My Events
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Upcoming Events */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                📅 Upcoming Events ({upcomingEvents.length})
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-base line-clamp-1">
                            {event.title}
                          </h4>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex-shrink-0">
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewDetails(event)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleMessageGroup(event)}
                      >
                        Message Group
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Events */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                ✅ Past Events ({pastEvents.length})
              </h3>
              <div className="space-y-3">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-card border border-border rounded-xl overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 grayscale">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-base line-clamp-1">
                            {event.title}
                          </h4>
                          <Badge variant="secondary" className="flex-shrink-0">
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <User className="w-6 h-6" />
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Tell others about yourself..."
                rows={4}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Input
                id="languages"
                value={profileData.languages}
                onChange={(e) => setProfileData({ ...profileData, languages: e.target.value })}
                placeholder="e.g., English, Spanish"
              />
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Input
                id="interests"
                value={profileData.interests}
                onChange={(e) => setProfileData({ ...profileData, interests: e.target.value })}
                placeholder="e.g., Hiking, Photography, Food"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          {selectedEvent && (
            <div className="space-y-0">
              {/* Header with Title and Message Button */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowEventDetails(false);
                      setTimeout(() => {
                        handleMessageGroup(selectedEvent, e);
                      }, 100);
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>

                {/* Host Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Hosted by Lily C.</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">4.5 rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details Section */}
              <div className="p-6 space-y-4 border-b">
                <h3 className="font-semibold">Event Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{selectedEvent.date}</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{selectedEvent.location}</p>
                      <button className="text-xs text-primary hover:underline">View on map</button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{selectedEvent.participants}/15 participants</p>
                      <div className="flex -space-x-2 mt-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-primary/30 border-2 border-background flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs">+{selectedEvent.participants - 4}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="p-6 space-y-4 border-b">
                <h3 className="font-semibold">About this event</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sunrise yoga session on the beach. All levels welcome! 🧘
                </p>
              </div>

              {/* What to Bring */}
              <div className="p-6 space-y-4 border-b">
                <h3 className="font-semibold">What to bring</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100">
                    Yoga Mats
                  </Badge>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100">
                    Comfortable shoes
                  </Badge>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100">
                    Sun protection
                  </Badge>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100">
                    Camera
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 space-y-3">
                <Button
                  className="w-full h-12 text-base font-semibold"
                  onClick={(e) => handleJoinEvent(selectedEvent.id, e)}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {joinedEvents.has(selectedEvent.id) ? "Leave Event" : "Join Event"}
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 h-12"
                    onClick={(e) => handleShareEvent(e)}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 h-12"
                    onClick={(e) => handleSaveEvent(selectedEvent.id, e)}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all ${savedEvents.has(selectedEvent.id) ? 'fill-red-500 text-red-500 scale-110' : ''}`} 
                    />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Group Dialog */}
      <Dialog open={showMessageGroup} onOpenChange={setShowMessageGroup}>
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
                      <p className="font-semibold text-sm mb-1">Sarah</p>
                      <p className="text-sm">Looking forward to this! What should I bring?</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 bg-background rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">Mike</p>
                      <p className="text-sm">Hey everyone! Don't forget comfortable shoes and water 💧</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 bg-background rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">Emma</p>
                      <p className="text-sm">Can't wait to meet you all! See you there! 🎉</p>
                      <p className="text-xs text-muted-foreground mt-1">30 minutes ago</p>
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
                    onClick={() => setShowMessageGroup(false)}
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

export default ProfilePage;
