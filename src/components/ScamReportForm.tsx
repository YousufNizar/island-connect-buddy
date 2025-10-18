import React, { useState } from 'react';
import { AlertTriangle, MapPin, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ScamReportFormProps {
  onClose: () => void;
  onSubmit: (report: ScamReport) => void;
  initialLocation?: { lat: number; lng: number };
}

export interface ScamReport {
  id: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  scamType: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  reporterName?: string;
  timestamp: Date;
  verified: boolean;
}

export const ScamReportForm: React.FC<ScamReportFormProps> = ({
  onClose,
  onSubmit,
  initialLocation
}) => {
  const [formData, setFormData] = useState({
    locationName: '',
    lat: initialLocation?.lat || 7.8731,
    lng: initialLocation?.lng || 80.7718,
    scamType: '',
    severity: 'medium' as 'low' | 'medium' | 'high',
    description: '',
    reporterName: ''
  });

  const scamTypes = [
    'Fake Tour Guide',
    'Overpriced Services',
    'Pickpocketing',
    'Money Exchange Scam',
    'Gem Shop Scam',
    'Taxi/Tuk-tuk Overcharge',
    'Fake Police/Official',
    'Restaurant Bill Scam',
    'Temple Donation Scam',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const report: ScamReport = {
      id: `user-${Date.now()}`,
      location: {
        lat: formData.lat,
        lng: formData.lng,
        name: formData.locationName
      },
      scamType: formData.scamType,
      severity: formData.severity,
      description: formData.description,
      reporterName: formData.reporterName || 'Anonymous',
      timestamp: new Date(),
      verified: false
    };

    onSubmit(report);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <CardTitle>Report a Scam Alert</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Name */}
            <div className="space-y-2">
              <Label htmlFor="locationName">Location Name *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="locationName"
                  placeholder="e.g., Colombo Fort Train Station"
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  type="number"
                  step="0.0001"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  type="number"
                  step="0.0001"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            {/* Scam Type */}
            <div className="space-y-2">
              <Label htmlFor="scamType">Type of Scam *</Label>
              <Select 
                value={formData.scamType}
                onValueChange={(value) => setFormData({ ...formData, scamType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scam type" />
                </SelectTrigger>
                <SelectContent>
                  {scamTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level *</Label>
              <Select 
                value={formData.severity}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setFormData({ ...formData, severity: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      ℹ️ Low - Minor inconvenience
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      ⚠️ Medium - Moderate risk
                    </span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      🚨 High - Serious threat
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">What happened? *</Label>
              <Textarea
                id="description"
                placeholder="Please describe the scam in detail. Include what happened, how much money was involved, and any tips for other travelers..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Be specific to help other travelers avoid this scam
              </p>
            </div>

            {/* Reporter Name (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="reporterName">Your Name (Optional)</Label>
              <Input
                id="reporterName"
                placeholder="Anonymous"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                Leave blank to report anonymously
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Your report helps keep travelers safe!</strong> All reports are reviewed before being displayed on the map. 
                Please be honest and detailed.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
