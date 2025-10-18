import { Shield, AlertTriangle, CheckCircle, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const SafetyPage = () => {
  const alerts = [
    {
      type: "warning",
      severity: "moderate",
      location: "Colombo Fort Area",
      description: "3 scam reports near train station in last 24 hours. Be cautious of unofficial 'tour guides'.",
      timestamp: "2 hours ago"
    },
    {
      type: "safe",
      location: "Galle Fort Historic District",
      description: "Verified safe for tourists. Tourist Police patrol active. Emergency services nearby.",
      timestamp: "Updated 1 hour ago"
    }
  ];

  const emergencyContacts = [
    { name: "Tourist Police", number: "1912", icon: "🚓" },
    { name: "Emergency Hospital", number: "110", icon: "🏥" },
    { name: "Fire & Rescue", number: "111", icon: "🚒" },
    { name: "Accident Service", number: "1990", icon: "🚑" }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 pb-8 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-3xl font-heading font-bold">Safety Center</h1>
        </div>
        <p className="text-white/90 text-sm">Stay informed and travel safely</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Emergency Contacts */}
        <div>
          <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Emergency Contacts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="bg-card rounded-lg p-4 border border-border shadow-card"
              >
                <div className="text-3xl mb-2">{contact.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{contact.name}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{contact.number}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Call Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Alerts */}
        <div>
          <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 border ${
                  alert.type === "warning"
                    ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900"
                    : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  {alert.type === "warning" ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={
                          alert.type === "warning"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                        }
                      >
                        {alert.type === "warning" ? "⚠️ MODERATE RISK" : "✅ SAFE ZONE"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      {alert.location}
                    </div>
                    <p className="text-sm text-foreground mb-2">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    View on Map
                  </Button>
                  {alert.type === "warning" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      Mark Safe
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div>
          <h2 className="text-xl font-heading font-bold mb-4">Safety Tips</h2>
          <div className="bg-card rounded-xl p-4 border border-border space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Always meet new connections in public places</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Share your location with trusted friends/family</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Trust your instincts - if something feels wrong, leave</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Use verified guides for unfamiliar locations</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Keep emergency contacts saved in your phone</p>
            </div>
          </div>
        </div>

        {/* Report Issue */}
        <div className="pb-4">
          <Button variant="destructive" size="lg" className="w-full">
            🚨 Report Safety Issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;
