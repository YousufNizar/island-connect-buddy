import { useState } from "react";
import { X, AlertTriangle, MapPin, Camera, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

type SafetyReportDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (report: SafetyReport) => void;
};

export type SafetyReport = {
  type: string;
  severity: string;
  location: string;
  description: string;
  timestamp: string;
};

const SafetyReportDialog = ({ open, onClose, onSubmit }: SafetyReportDialogProps) => {
  const [reportType, setReportType] = useState("scam");
  const [severity, setSeverity] = useState("moderate");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!location.trim() || !description.trim()) {
      return;
    }

    const report: SafetyReport = {
      type: reportType,
      severity,
      location: location.trim(),
      description: description.trim(),
      timestamp: new Date().toLocaleString(),
    };

    onSubmit(report);
    
    // Reset form
    setReportType("scam");
    setSeverity("moderate");
    setLocation("");
    setDescription("");
  };

  const reportTypes = [
    { value: "scam", label: "🎭 Scam/Fraud", color: "text-red-600" },
    { value: "theft", label: "💰 Theft/Pickpocket", color: "text-orange-600" },
    { value: "harassment", label: "⚠️ Harassment", color: "text-red-600" },
    { value: "unsafe-area", label: "🚫 Unsafe Area", color: "text-yellow-600" },
    { value: "transport", label: "🚕 Transport Issue", color: "text-blue-600" },
    { value: "health", label: "🏥 Health Concern", color: "text-purple-600" },
    { value: "other", label: "📋 Other", color: "text-gray-600" },
  ];

  const selectedType = reportTypes.find(t => t.value === reportType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Report Safety Issue</h2>
                <p className="text-sm text-white/90">Help keep our community safe</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>🛡️ Your report helps protect travelers.</strong> All reports are anonymous and will be reviewed by our safety team.
            </p>
          </div>

          {/* Report Type */}
          <div className="space-y-2">
            <Label htmlFor="report-type">Issue Type *</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity Level */}
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level *</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={severity === "low" ? "default" : "outline"}
                className={severity === "low" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                onClick={() => setSeverity("low")}
              >
                Low
              </Button>
              <Button
                type="button"
                variant={severity === "moderate" ? "default" : "outline"}
                className={severity === "moderate" ? "bg-orange-500 hover:bg-orange-600" : ""}
                onClick={() => setSeverity("moderate")}
              >
                Moderate
              </Button>
              <Button
                type="button"
                variant={severity === "high" ? "default" : "outline"}
                className={severity === "high" ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setSeverity("high")}
              >
                High
              </Button>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., Colombo Fort Station, Galle Road near Beach"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              placeholder="Please provide details about what happened, when, and any other relevant information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] p-3 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">
              Be as specific as possible to help others stay safe
            </p>
          </div>

          {/* Photo Upload Placeholder */}
          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload photos</p>
              <p className="text-xs text-muted-foreground mt-1">(Feature coming soon)</p>
            </div>
          </div>

          {/* Anonymous Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
              🔒 Anonymous Report
            </Badge>
            <span className="text-xs text-muted-foreground">Your identity will not be shared</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-muted/50">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={handleSubmit}
              disabled={!location.trim() || !description.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyReportDialog;
