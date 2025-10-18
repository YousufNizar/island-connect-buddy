// Demo data and test utilities for QR Tracking System

import type { QRCodeData } from '../types/qrTracking';

/**
 * Sample locations with QR data
 */
export const demoLocations = [
  {
    id: 'loc_sigiriya',
    name: 'Sigiriya Rock Fortress',
    checkInQR: {
      locationId: 'loc_sigiriya',
      locationName: 'Sigiriya Rock Fortress',
      timestamp: Date.now(),
      type: 'check-in' as const,
    },
    checkOutQR: {
      locationId: 'loc_sigiriya',
      locationName: 'Sigiriya Rock Fortress',
      timestamp: Date.now(),
      type: 'check-out' as const,
    },
  },
  {
    id: 'loc_galle_fort',
    name: 'Galle Fort Historic District',
    checkInQR: {
      locationId: 'loc_galle_fort',
      locationName: 'Galle Fort Historic District',
      timestamp: Date.now(),
      type: 'check-in' as const,
    },
    checkOutQR: {
      locationId: 'loc_galle_fort',
      locationName: 'Galle Fort Historic District',
      timestamp: Date.now(),
      type: 'check-out' as const,
    },
  },
  {
    id: 'loc_ella_rock',
    name: 'Ella Rock Hiking Trail',
    checkInQR: {
      locationId: 'loc_ella_rock',
      locationName: 'Ella Rock Hiking Trail',
      timestamp: Date.now(),
      type: 'check-in' as const,
    },
    checkOutQR: {
      locationId: 'loc_ella_rock',
      locationName: 'Ella Rock Hiking Trail',
      timestamp: Date.now(),
      type: 'check-out' as const,
    },
  },
  {
    id: 'loc_temple_tooth',
    name: 'Temple of the Sacred Tooth Relic',
    checkInQR: {
      locationId: 'loc_temple_tooth',
      locationName: 'Temple of the Sacred Tooth Relic',
      timestamp: Date.now(),
      type: 'check-in' as const,
    },
    checkOutQR: {
      locationId: 'loc_temple_tooth',
      locationName: 'Temple of the Sacred Tooth Relic',
      timestamp: Date.now(),
      type: 'check-out' as const,
    },
  },
  {
    id: 'loc_mirissa_beach',
    name: 'Mirissa Beach',
    checkInQR: {
      locationId: 'loc_mirissa_beach',
      locationName: 'Mirissa Beach',
      timestamp: Date.now(),
      type: 'check-in' as const,
    },
    checkOutQR: {
      locationId: 'loc_mirissa_beach',
      locationName: 'Mirissa Beach',
      timestamp: Date.now(),
      type: 'check-out' as const,
    },
  },
];

/**
 * Generate QR code data JSON string for testing
 */
export const generateQRString = (qrData: QRCodeData): string => {
  return JSON.stringify(qrData);
};

/**
 * Sample tourist data for testing
 */
export const sampleTourists = [
  {
    name: 'John Smith',
    phone: '+94771234567',
    emergencyContact: '+1234567890',
    expectedDuration: 120,
  },
  {
    name: 'Emma Johnson',
    phone: '+94772345678',
    emergencyContact: '+1234567891',
    expectedDuration: 90,
  },
  {
    name: 'Michael Brown',
    phone: '+94773456789',
    emergencyContact: '+1234567892',
    expectedDuration: 60,
  },
];

/**
 * Test scenarios for QR tracking
 */
export const testScenarios = {
  happyPath: {
    description: 'Tourist checks in and out successfully',
    steps: [
      '1. Tourist scans check-in QR code',
      '2. Fills in information (name, phone, duration)',
      '3. Confirms check-in',
      '4. Visits location',
      '5. Scans check-out QR code before expected time',
      '6. System confirms checkout',
    ],
    expected: 'No alerts generated, visit marked as completed',
  },
  overdueScenario: {
    description: 'Tourist forgets to check out',
    steps: [
      '1. Tourist checks in',
      '2. Expected duration: 60 minutes',
      '3. Tourist forgets to check out',
      '4. System waits 75 minutes (60 + 15 grace period)',
      '5. System creates alert',
      '6. Authorities are notified',
    ],
    expected: 'Alert generated, authorities can take action',
  },
  multipleLocations: {
    description: 'Tourist visits multiple locations',
    steps: [
      '1. Check in at Location A',
      '2. Check in at Location B (warning shown)',
      '3. Check out from Location A',
      '4. Check out from Location B',
    ],
    expected: 'System tracks both visits, shows warnings for active check-ins',
  },
};

/**
 * Utility to create a test QR code URL
 */
export const createTestQRCodeURL = (locationId: string, type: 'check-in' | 'check-out'): string => {
  const location = demoLocations.find(loc => loc.id === locationId);
  if (!location) return '';
  
  const qrData = type === 'check-in' ? location.checkInQR : location.checkOutQR;
  return `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(qrData))}`;
};

/**
 * Mock alert data for UI testing
 */
export const mockAlerts = [
  {
    id: 'alert_001',
    visitId: 'visit_001',
    touristId: '+94771234567',
    touristName: 'John Smith',
    locationName: 'Ella Rock Hiking Trail',
    alertTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    alertType: 'overdue' as const,
    resolved: false,
  },
  {
    id: 'alert_002',
    visitId: 'visit_002',
    touristId: '+94772345678',
    touristName: 'Emma Johnson',
    locationName: 'Sigiriya Rock Fortress',
    alertTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    alertType: 'overdue' as const,
    resolved: false,
  },
];

export default {
  demoLocations,
  generateQRString,
  sampleTourists,
  testScenarios,
  createTestQRCodeURL,
  mockAlerts,
};
