import { useState } from "react";
import { MapPin, Users, Calendar, Shield, User } from "lucide-react";
import MapView from "@/components/MapView";
import ConnectFeed from "@/components/ConnectFeed";
import EventsPage from "@/components/EventsPage";
import SafetyPage from "@/components/SafetyPage";
import ProfilePage from "@/components/ProfilePage";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"map" | "connect" | "events" | "safety" | "profile">("map");

  const tabs = [
    { id: "map" as const, icon: MapPin, label: "Explore" },
    { id: "connect" as const, icon: Users, label: "Connect" },
    { id: "events" as const, icon: Calendar, label: "Events" },
    { id: "safety" as const, icon: Shield, label: "Safety" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden pb-20">
        {activeTab === "map" && <MapView />}
        {activeTab === "connect" && <ConnectFeed />}
        {activeTab === "events" && <EventsPage />}
        {activeTab === "safety" && <SafetyPage />}
        {activeTab === "profile" && <ProfilePage />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "animate-bounce-subtle" : ""}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;
