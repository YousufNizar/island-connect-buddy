import { User, MapPin, Star, Award, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

const ProfilePage = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 pb-8 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-heading font-bold">Profile</h1>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-heading font-bold">You</h2>
              <Badge className="bg-blue-600 text-white">✓ Verified</Badge>
            </div>
            <p className="text-white/90 text-sm">Exploring Sri Lanka</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-card border-b border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground">Places Visited</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">8</p>
          <p className="text-xs text-muted-foreground">Reviews Written</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">82</p>
          <p className="text-xs text-muted-foreground">Sustainability</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Events Joined</span>
              <span className="font-semibold">5 meetups</span>
            </div>
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
    </div>
  );
};

export default ProfilePage;
