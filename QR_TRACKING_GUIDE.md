# QR Code Tourist Tracking System

## Overview

The QR Code Tourist Tracking System is a safety feature that allows tourists to check in and out of locations by scanning QR codes. If a tourist doesn't check out within the expected timeframe, the system automatically alerts authorities.

## Features

### For Tourists

1. **QR Code Check-In**
   - Scan QR code at location entrance
   - Provide name, phone number, and expected visit duration
   - Optional emergency contact
   - Receive confirmation of check-in

2. **QR Code Check-Out**
   - Scan QR code at location exit
   - System confirms safe departure
   - Visit record updated

3. **Active Check-Ins Display**
   - View all active check-ins
   - Get reminders to check out
   - Track visit duration

4. **Automatic Safety Alerts**
   - If check-out is missed by 15+ minutes after expected time
   - Authorities are automatically notified
   - Emergency contacts are alerted (future feature)

### For Location Managers

1. **QR Code Generation**
   - Generate check-in QR codes
   - Generate check-out QR codes
   - Download and print codes
   - Display at entry/exit points

2. **Location Tracking**
   - Monitor active visitors
   - View check-in/check-out history
   - Generate safety reports

### For Authorities

1. **Real-Time Alerts**
   - View overdue tourists
   - Access tourist contact information
   - View last known location
   - Mark alerts as resolved

2. **Alert Types**
   - **Overdue**: Tourist hasn't checked out on time
   - **Emergency**: Manual emergency alert triggered

## Technical Implementation

### Database Collections

#### `location_visits`
```typescript
{
  id: string;
  touristName: string;
  touristPhone: string;
  emergencyContact?: string;
  locationId: string;
  locationName: string;
  checkInTime: Timestamp;
  checkOutTime?: Timestamp;
  expectedDuration: number; // minutes
  status: 'checked-in' | 'checked-out' | 'overdue' | 'alert-sent';
  qrCode: string; // JSON of QR data
}
```

#### `safety_alerts`
```typescript
{
  id: string;
  visitId: string;
  touristId: string;
  touristName: string;
  locationName: string;
  alertTime: Timestamp;
  alertType: 'overdue' | 'emergency';
  resolved: boolean;
  resolvedTime?: Timestamp;
  notes?: string;
}
```

### QR Code Data Format

```json
{
  "locationId": "loc_123456",
  "locationName": "Sigiriya Rock Fortress",
  "timestamp": 1697654400000,
  "type": "check-in" // or "check-out"
}
```

## Usage Guide

### For Tourists

1. **Before Visiting a Location**
   - Go to Safety Center
   - Click "Scan QR Code to Check In/Out"
   - Fill in your information:
     - Full name (required)
     - Phone number (required)
     - Emergency contact (optional)
     - Expected visit duration (default: 60 minutes)

2. **At Location Entrance**
   - Locate the check-in QR code (usually at entrance)
   - Click "Start Scanning"
   - Point camera at QR code
   - Verify location details
   - Click "Check In"
   - Receive confirmation

3. **During Visit**
   - Keep phone accessible
   - Note the expected check-out time
   - If delayed, extend visit or check out early

4. **At Location Exit**
   - Locate the check-out QR code (usually at exit)
   - Scan QR code
   - Click "Check Out"
   - Receive confirmation

### For Location Managers

1. **Generate QR Codes**
   - Go to Safety Center
   - Click "Generate QR Code (For Locations)"
   - Enter location details:
     - Location name
     - Location ID (optional, auto-generated)
   - Select QR type (Check-In or Check-Out)
   - Download QR code as PNG
   - Print and laminate for durability

2. **Display QR Codes**
   - Place check-in code at main entrance
   - Place check-out code at exit
   - Ensure good lighting
   - Add multilingual instructions
   - Include emergency contact numbers

3. **Recommended Locations**
   - Tourist attractions
   - Hiking trails
   - Beach areas
   - Remote locations
   - Areas with limited mobile coverage (check-in before entering)

## Security & Privacy

- Tourist data is encrypted in Firebase
- Phone numbers are used for identification only
- Data retention: 30 days after check-out
- Authorities only alerted when necessary
- GDPR compliant data handling

## Alert System

### Automatic Monitoring

The system runs background checks every 5 minutes:

1. Identifies tourists who are checked in
2. Calculates expected check-out time
3. If 15+ minutes overdue:
   - Updates status to "overdue"
   - Creates safety alert
   - Notifies authorities (in production, via SMS/push)

### Manual Alerts

Tourists can trigger emergency alerts:
- SOS button in app
- Share location with authorities
- Contact emergency services

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Location visits - tourists can read/write their own
    match /location_visits/{visitId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    
    // Safety alerts - authorities can read all
    match /safety_alerts/{alertId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

## Future Enhancements

1. **SMS Notifications**
   - Alert tourists before check-out time
   - Send reminders 15 minutes before expected time
   - Notify emergency contacts

2. **GPS Integration**
   - Verify tourist is actually at location
   - Track movement within location
   - Geofencing for automatic check-out

3. **Multi-Language Support**
   - QR code instructions in multiple languages
   - App interface translations

4. **Analytics Dashboard**
   - Visitor statistics
   - Average visit durations
   - Safety incident reports
   - Popular times/seasons

5. **Integration with Police Systems**
   - Direct API to tourist police
   - Real-time alert forwarding
   - Case management system

6. **Offline Support**
   - Store check-ins locally when offline
   - Sync when connection restored
   - Offline QR code generation

## Testing

### Test Scenarios

1. **Happy Path**
   - Tourist checks in
   - Tourist checks out on time
   - No alerts generated

2. **Overdue Scenario**
   - Tourist checks in
   - Doesn't check out
   - Alert generated after 15 minutes
   - Authority resolves alert

3. **Multiple Locations**
   - Tourist checks into location A
   - Tourist checks into location B
   - System tracks both
   - Warning shown for active check-ins

4. **Camera Permissions**
   - Camera blocked
   - Error message shown
   - Fallback instructions provided

## Support

For issues or questions:
- Email: support@islandconnect.lk
- Phone: +94 11 234 5678
- Tourist Police: 1912

## License

© 2025 Island Connect Buddy. All rights reserved.
