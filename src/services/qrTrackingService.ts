// QR Code Tracking Service
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import type { LocationVisit, AlertRecord, QRCodeData } from '../types/qrTracking';

const VISITS_COLLECTION = 'location_visits';
const ALERTS_COLLECTION = 'safety_alerts';

/**
 * Check-in a tourist to a location
 */
export const checkInTourist = async (
  touristData: {
    name: string;
    phone: string;
    emergencyContact?: string;
  },
  qrData: QRCodeData,
  expectedDuration: number
): Promise<string> => {
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

  const visitData = {
    touristName: touristData.name,
    touristPhone: touristData.phone,
    emergencyContact: touristData.emergencyContact || '',
    locationId: qrData.locationId,
    locationName: qrData.locationName,
    checkInTime: serverTimestamp(),
    expectedDuration,
    status: 'checked-in',
    qrCode: JSON.stringify(qrData),
  };

  const docRef = await addDoc(collection(db, VISITS_COLLECTION), visitData);
  return docRef.id;
};

/**
 * Check-out a tourist from a location
 */
export const checkOutTourist = async (
  touristPhone: string,
  qrData: QRCodeData
): Promise<boolean> => {
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

  // Find the active check-in for this tourist at this location
  const q = query(
    collection(db, VISITS_COLLECTION),
    where('touristPhone', '==', touristPhone),
    where('locationId', '==', qrData.locationId),
    where('status', '==', 'checked-in')
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('No active check-in found for this location');
  }

  // Update the first matching record (should only be one)
  const visitDoc = querySnapshot.docs[0];
  await updateDoc(doc(db, VISITS_COLLECTION, visitDoc.id), {
    checkOutTime: serverTimestamp(),
    status: 'checked-out',
  });

  return true;
};

/**
 * Get active check-ins for a tourist
 */
export const getActiveCheckIns = async (touristPhone: string): Promise<LocationVisit[]> => {
  if (!db) {
    return [];
  }

  const q = query(
    collection(db, VISITS_COLLECTION),
    where('touristPhone', '==', touristPhone),
    where('status', '==', 'checked-in'),
    orderBy('checkInTime', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      checkInTime: data.checkInTime?.toDate(),
      checkOutTime: data.checkOutTime?.toDate(),
    } as LocationVisit;
  });
};

/**
 * Check for overdue tourists and create alerts
 */
export const checkOverdueTourists = async (): Promise<void> => {
  if (!db) {
    return;
  }

  const q = query(
    collection(db, VISITS_COLLECTION),
    where('status', '==', 'checked-in')
  );

  const querySnapshot = await getDocs(q);
  const now = new Date();

  for (const docSnapshot of querySnapshot.docs) {
    const visit = docSnapshot.data();
    const checkInTime = visit.checkInTime?.toDate();
    
    if (!checkInTime) continue;

    const expectedCheckOutTime = new Date(
      checkInTime.getTime() + visit.expectedDuration * 60000
    );

    // If 15 minutes past expected checkout time
    if (now > new Date(expectedCheckOutTime.getTime() + 15 * 60000)) {
      // Update visit status
      await updateDoc(doc(db, VISITS_COLLECTION, docSnapshot.id), {
        status: 'overdue',
      });

      // Create alert if not already sent
      if (visit.status !== 'alert-sent') {
        await createAlert({
          visitId: docSnapshot.id,
          touristId: visit.touristPhone,
          touristName: visit.touristName,
          locationName: visit.locationName,
          alertType: 'overdue',
        });

        // Mark alert as sent
        await updateDoc(doc(db, VISITS_COLLECTION, docSnapshot.id), {
          status: 'alert-sent',
        });
      }
    }
  }
};

/**
 * Create a safety alert
 */
export const createAlert = async (alertData: {
  visitId: string;
  touristId: string;
  touristName: string;
  locationName: string;
  alertType: 'overdue' | 'emergency';
}): Promise<string> => {
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

  const alert = {
    ...alertData,
    alertTime: serverTimestamp(),
    resolved: false,
  };

  const docRef = await addDoc(collection(db, ALERTS_COLLECTION), alert);
  
  // In a real app, this would trigger notifications to authorities
  console.log('🚨 ALERT CREATED:', {
    type: alertData.alertType,
    tourist: alertData.touristName,
    location: alertData.locationName,
  });

  return docRef.id;
};

/**
 * Get active alerts
 */
export const getActiveAlerts = async (): Promise<AlertRecord[]> => {
  if (!db) {
    return [];
  }

  const q = query(
    collection(db, ALERTS_COLLECTION),
    where('resolved', '==', false),
    orderBy('alertTime', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      alertTime: data.alertTime?.toDate(),
      resolvedTime: data.resolvedTime?.toDate(),
    } as AlertRecord;
  });
};

/**
 * Resolve an alert
 */
export const resolveAlert = async (alertId: string, notes?: string): Promise<void> => {
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

  await updateDoc(doc(db, ALERTS_COLLECTION, alertId), {
    resolved: true,
    resolvedTime: serverTimestamp(),
    notes: notes || '',
  });
};

/**
 * Subscribe to active alerts (real-time)
 */
export const subscribeToActiveAlerts = (
  callback: (alerts: AlertRecord[]) => void
): (() => void) => {
  if (!db) {
    return () => {};
  }

  const q = query(
    collection(db, ALERTS_COLLECTION),
    where('resolved', '==', false),
    orderBy('alertTime', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const alerts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        alertTime: data.alertTime?.toDate(),
        resolvedTime: data.resolvedTime?.toDate(),
      } as AlertRecord;
    });
    callback(alerts);
  });
};
