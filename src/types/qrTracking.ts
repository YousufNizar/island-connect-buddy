// Types for QR Code Tracking System

export interface LocationVisit {
  id: string;
  touristId: string;
  touristName: string;
  touristPhone: string;
  locationId: string;
  locationName: string;
  checkInTime: Date;
  checkOutTime?: Date;
  expectedDuration: number; // in minutes
  status: 'checked-in' | 'checked-out' | 'overdue' | 'alert-sent';
  emergencyContact?: string;
  qrCode: string;
}

export interface AlertRecord {
  id: string;
  visitId: string;
  touristId: string;
  touristName: string;
  locationName: string;
  alertTime: Date;
  alertType: 'overdue' | 'emergency';
  resolved: boolean;
  resolvedTime?: Date;
  notes?: string;
}

export interface QRCodeData {
  locationId: string;
  locationName: string;
  timestamp: number;
  type: 'check-in' | 'check-out';
}
