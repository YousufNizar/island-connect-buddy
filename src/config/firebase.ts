// Firebase Configuration
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';

// Check if Firebase is configured properly
const isFirebaseConfigured = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_API_KEY.length > 20 // Ensure it's a real API key
);

// Initialize Firebase ONLY if properly configured
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    console.log('✅ Firebase initialized successfully');

    // Development: Connect to emulators
    if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
      try {
        connectFirestoreEmulator(db, 'localhost', 8080);
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectStorageEmulator(storage, 'localhost', 9199);
        console.log('✅ Firebase emulators connected');
      } catch (err: unknown) {
        if (err instanceof Error && !err.message.includes('already connected')) {
          console.error('Firebase emulator error:', err);
        }
      }
    }
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    app = null;
    db = null;
    auth = null;
    storage = null;
  }
} else {
  console.warn('⚠️ Firebase not configured. Add credentials to .env file to enable Firebase features.');
  console.info('📝 See docs/QUICKSTART.md for setup instructions');
}

export { app, db, auth, storage, isFirebaseConfigured };
