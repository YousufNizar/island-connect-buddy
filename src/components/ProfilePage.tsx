import { User, MapPin, Star, Award, Settings, LogOut, Calendar, Users, Clock, MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import TravelJournal from "./TravelJournal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

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
          <Button variant="outline" size="lg" className="w-full justify-start">
            <User className="w-5 h-5 mr-3" />
            Edit Profile
          </Button>
          <Button variant="outline" size="lg" className="w-full justify-start">
            <MapPin className="w-5 h-5 mr-3" />
            My Saved Places
          </Button>
          <Button variant="outline" size="lg" className="w-full justify-start text-destructive">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

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
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
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
    </div>
  );
};

export default ProfilePage;
