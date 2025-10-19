import { Shield, AlertTriangle, CheckCircle, Phone, MapPin, QrCode, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import QRCodeScanner from "./QRCodeScanner";
import QRCodeGenerator from "./QRCodeGenerator";
import SafetyMap from "./SafetyMap";
import SafetyReportDialog, { type SafetyReport } from "./SafetyReportDialog";
import { subscribeToActiveAlerts, resolveAlert } from "../services/qrTrackingService";
import type { AlertRecord } from "../types/qrTracking";

const SafetyPage = () => {
  const { toast } = useToast();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [showSafetyMap, setShowSafetyMap] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<{
    id: string;
    type: "warning" | "safe";
    location: string;
    description: string;
    timestamp: string;
    coordinates: [number, number];
  } | null>(null);
  const [markedSafeAlerts, setMarkedSafeAlerts] = useState<Set<number>>(new Set());
  const [activeAlerts, setActiveAlerts] = useState<AlertRecord[]>([]);

  useEffect(() => {
    // Subscribe to real-time alerts
    const unsubscribe = subscribeToActiveAlerts((alerts) => {
      setActiveAlerts(alerts);
    });

    return () => unsubscribe();
  }, []);

  const handleResolveAlert = async (alertId: string) => {
    try {
      await resolveAlert(alertId, 'Resolved from Safety Page');
    } catch (err) {
      console.error('Error resolving alert:', err);
    }
  };

  const handleMarkSafe = (index: number) => {
    setMarkedSafeAlerts(prev => new Set([...prev, index]));
    toast({
      title: "Area Marked as Safe ✅",
      description: "Thank you for helping keep our community informed!",
    });
  };

  const handleSubmitReport = (report: SafetyReport) => {
    // In a real app, this would send to a backend API
    console.log("Safety report submitted:", report);
    
    setShowReportDialog(false);
    
    toast({
      title: "Report Submitted Successfully 🚨",
      description: "Thank you for helping keep travelers safe. Our team will review your report.",
      duration: 5000,
    });
  };

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
    { name: "Tourist Police", number: "+94 11 242 1052", icon: "🚓" },
    { name: "Emergency Hospital", number: "118", icon: "🏥" },
    { name: "Fire & Rescue", number: "011-2422222", icon: "🚒" },
    { name: "Accident Service", number: "1990", icon: "🚑" }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* QR Scanner Modal */}
      {showQRScanner && <QRCodeScanner onClose={() => setShowQRScanner(false)} />}
      
      {/* QR Generator Dialog */}
      <Dialog open={showQRGenerator} onOpenChange={setShowQRGenerator}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <QRCodeGenerator onClose={() => setShowQRGenerator(false)} />
        </DialogContent>
      </Dialog>

      {/* Safety Map */}
      {showSafetyMap && (
        <SafetyMap
          alert={selectedAlert || undefined}
          onClose={() => {
            setShowSafetyMap(false);
            setSelectedAlert(null);
          }}
        />
      )}

      {/* Safety Report Dialog */}
      <SafetyReportDialog
        open={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        onSubmit={handleSubmitReport}
      />

      {/* Header */}
     

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-4 sm:pt-4 pb-3 sm:pb-4 space-y-4 sm:space-y-6">
        {/* QR Code Tracking Section */}
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Location Tracking
          </h2>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 sm:p-6 border-2 border-primary/20">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/20 rounded-full p-2 sm:p-3">
                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Stay Safe with QR Check-in</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  Scan QR codes at locations to let authorities know where you are. If you don't check out on time, we'll send help.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <Button 
                size="lg" 
                className="w-full text-sm sm:text-base h-10 sm:h-11"
                onClick={() => setShowQRScanner(true)}
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Scan QR Code to Check In/Out
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full text-sm sm:text-base h-10 sm:h-11"
                onClick={() => setShowQRGenerator(true)}
              >
                Generate QR Code (For Locations)
              </Button>
            </div>
          </div>
        </div>

        {/* Emergency Tourist Alerts */}
        {activeAlerts.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-600 animate-pulse" />
              Emergency Alerts ({activeAlerts.length})
            </h2>
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <Badge className="bg-red-600 text-white mb-2">
                        🚨 {alert.alertType.toUpperCase()}
                      </Badge>
                      <h4 className="font-semibold text-lg mb-1">{alert.touristName}</h4>
                      <p className="text-sm mb-1">
                        <strong>Last seen:</strong> {alert.locationName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Alert time: {alert.alertTime?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      Contact Tourist Police
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Emergency Contacts
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="bg-card rounded-lg p-3 sm:p-4 border border-border shadow-card"
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{contact.icon}</div>
                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{contact.name}</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">{contact.number}</p>
                <Button size="sm" variant="outline" className="w-full text-xs h-8">
                  Call Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Alerts */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-heading font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Active Alerts
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedAlert(null);
                setShowSafetyMap(true);
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              View All on Map
            </Button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {alerts.map((alert, index) => {
              const isMarkedSafe = markedSafeAlerts.has(index);
              const displayType = isMarkedSafe ? "safe" : alert.type;
              
              return (
              <div
                key={index}
                className={`rounded-xl p-3 sm:p-4 border ${
                  displayType === "warning"
                    ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900"
                    : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  {displayType === "warning" ? (
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                  ) : (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${
                            displayType === "warning"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                          }`}
                        >
                          {displayType === "warning" ? "⚠️ MODERATE RISK" : "✅ SAFE ZONE"}
                        </Badge>
                        {isMarkedSafe && (
                          <Badge variant="outline" className="text-xs">
                            ✓ Marked Safe by Community
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {alert.location}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground mb-1 sm:mb-2">{alert.description}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs h-8"
                    onClick={() => {
                      // Map alert to proper coordinates
                      const coordinates: [number, number] = 
                        alert.location === "Colombo Fort Area" ? [6.9344, 79.8428] :
                        alert.location === "Galle Fort Historic District" ? [6.0261, 80.2168] :
                        [6.9271, 79.8612]; // Default Colombo
                      
                      setSelectedAlert({
                        id: `alert-${index}`,
                        type: alert.type as "warning" | "safe",
                        location: alert.location,
                        description: alert.description,
                        timestamp: alert.timestamp,
                        coordinates,
                      });
                      setShowSafetyMap(true);
                    }}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    View on Map
                  </Button>
                  {alert.type === "warning" && !isMarkedSafe && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs h-8"
                      onClick={() => handleMarkSafe(index)}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Safe
                    </Button>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Safety Tips */}
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4">Safety Tips</h2>
          <div className="bg-card rounded-xl p-3 sm:p-4 border border-border space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">Always meet new connections in public places</p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">Share your location with trusted friends/family</p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">Trust your instincts - if something feels wrong, leave</p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">Use verified guides for unfamiliar locations</p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">Keep emergency contacts saved in your phone</p>
            </div>
          </div>
        </div>

        {/* Report Issue */}
        <div className="pb-2 sm:pb-4">
          <Button 
            variant="destructive" 
            size="lg" 
            className="w-full text-sm sm:text-base h-10 sm:h-11"
            onClick={() => setShowReportDialog(true)}
          >
            🚨 Report Safety Issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;
