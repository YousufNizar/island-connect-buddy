# Firebase Integration Complete Setup Guide

## 🔥 Step-by-Step Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it: `Sri Lanka Travel Connect`
4. Enable Google Analytics (optional)
5. Click "Create project"

---

### Step 2: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **Test mode** (for development)
4. Choose location: `asia-south1` (Mumbai) - closest to Sri Lanka
5. Click "Enable"

---

### Step 3: Enable Authentication

1. Go to **Authentication**
2. Click "Get started"
3. Enable providers:
   - ✅ Email/Password
   - ✅ Google
   - ✅ Anonymous (for testing)
4. Save

---

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click web icon `</>`
4. Register app: `island-connect-buddy`
5. Copy the `firebaseConfig` object

---

### Step 5: Add Environment Variables

Create `.env` file in project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Google Maps (already configured)
VITE_GOOGLE_MAPS_API_KEY=YOUR_EXISTING_KEY
VITE_GOOGLE_MAPS_LIBRARY=places,maps,marker
```

**Important**: Add `.env` to `.gitignore`!

---

### Step 6: Configure Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Ratings collection
    match /ratings/{document=**} {
      // Anyone can read ratings
      allow read: if true;
      
      // Only authenticated users can create ratings
      allow create: if request.auth != null;
      
      // Users can only update their own ratings
      allow update: if request.auth.uid == resource.data.userId;
      
      // Users can only delete their own ratings
      allow delete: if request.auth.uid == resource.data.userId;
    }
    
    // Sustainability metrics
    match /sustainability_metrics/{document=**} {
      // Anyone can read
      allow read: if true;
      
      // Only admin can write
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
  }
}
```

3. Click **Publish**

---

### Step 7: Firestore Database Structure

Your database will have two main collections:

#### `/ratings/{ratingId}`
```javascript
{
  locationId: number,
  userId: string,
  rating: number,          // 1-5
  comment: string,
  category: string,        // safety, eco_friendly, cultural, general
  timestamp: Timestamp,
  helpful_count: number,
  isVerified: boolean
}
```

#### `/sustainability_metrics/{metricsId}`
```javascript
{
  locationId: number,
  metrics: {
    localOwnership: number,  // 0-100
    ecoFriendly: number,     // 0-100
    culturalValue: number,   // 0-100
    touristImpact: number    // 0-100
  },
  score: number,             // 0-100
  level: string,             // High, Moderate, Low
  lastUpdated: Timestamp
}
```

---

### Step 8: Create Firestore Indexes (Optional but Recommended)

1. Go to **Firestore Database** → **Indexes**
2. Create composite indexes:

```
Collection: ratings
Fields:
  - locationId (Ascending)
  - timestamp (Descending)

Collection: ratings
Fields:
  - locationId (Ascending)
  - userId (Ascending)
```

Or wait for Firebase to suggest them automatically when you run queries.

---

## 🚀 Usage in Your Application

### Example: Location Detail Modal with Real Data

```typescript
import { useLocationRatings } from '@/hooks/useLocationRatings';
import { useSubmitRating } from '@/hooks/useSubmitRating';
import { RatingForm } from '@/components/RatingForm';
import { RatingsDisplay } from '@/components/RatingsDisplay';
import { SustainabilityCard } from '@/components/SustainabilityCard';

const EnhancedLocationDetailModal = ({ location }: { location: Location }) => {
  // Fetch ratings data from Firebase
  const { data, isLoading, refresh } = useLocationRatings(location.id);
  
  // Hook to submit new ratings
  const { submitRating, isLoading: isSubmitting } = useSubmitRating();

  const handleSubmitReview = async (
    rating: number,
    comment: string,
    category: string
  ) => {
    // Get current user ID from your auth context
    const userId = 'current_user_id'; // Replace with actual user ID
    
    const success = await submitRating(
      location.id,
      userId,
      rating,
      comment,
      category as 'safety' | 'eco_friendly' | 'cultural' | 'general'
    );
    
    if (success) {
      // Refresh ratings after successful submission
      refresh();
    }
  };

  const handleHelpful = async (reviewId: string) => {
    await FirestoreService.markRatingHelpful(reviewId);
    refresh();
  };

  if (isLoading) {
    return <div>Loading ratings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Sustainability Card */}
      {data && (
        <SustainabilityCard
          score={data.sustainabilityScore}
          metrics={data.metrics}
        />
      )}

      {/* Rating Form */}
      <RatingForm
        locationId={location.id}
        locationName={location.name}
        onSubmit={handleSubmitReview}
        isLoading={isSubmitting}
      />

      {/* Ratings Display */}
      {data && (
        <RatingsDisplay
          averageRating={data.averageRating}
          totalReviews={data.totalReviews}
          reviews={data.reviews}
          onHelpful={handleHelpful}
        />
      )}
    </div>
  );
};
```

---

## 🧪 Testing Firebase Integration

### Test Locally (Development Mode)

1. **Start the app**:
```bash
npm run dev
```

2. **Test rating submission**:
   - Open a location detail modal
   - Fill out the rating form
   - Submit a review
   - Check Firebase Console → Firestore to see the new document

3. **Test rating display**:
   - Add multiple reviews in Firebase Console manually
   - Refresh the page
   - Verify reviews appear correctly

### Firebase Emulators (Optional)

Run Firebase locally for faster development:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize emulators
firebase init emulators

# Start emulators
firebase emulators:start
```

---

## 📊 Initial Data Seeding

### Seed Sustainability Metrics

You can manually add sustainability metrics in Firebase Console:

```javascript
// Example document in sustainability_metrics collection
{
  locationId: 1,
  metrics: {
    localOwnership: 95,
    ecoFriendly: 88,
    culturalValue: 92,
    touristImpact: 75
  },
  score: 89,
  level: "High",
  lastUpdated: (current timestamp)
}
```

Or use the service:

```typescript
import { FirestoreService } from '@/services/firestoreService';

// Add sustainability metrics for a location
await FirestoreService.saveSustainabilityMetrics(1, {
  localOwnership: 95,
  ecoFriendly: 88,
  culturalValue: 92,
  touristImpact: 75
});
```

---

## 🔐 Security Considerations

### For Production:

1. **Update Firestore Rules** to be more restrictive:
```javascript
// Only allow one review per user per location
match /ratings/{document=**} {
  allow create: if request.auth != null &&
    !exists(/databases/$(database)/documents/ratings/$(request.auth.uid + '_' + request.resource.data.locationId));
}
```

2. **Add rate limiting** to prevent spam
3. **Implement content moderation** for reviews
4. **Set up Firebase App Check** to prevent abuse

---

## 📈 Monitoring & Analytics

### Enable Firebase Analytics

1. Go to **Analytics** in Firebase Console
2. Track events:
   - `review_submitted`
   - `location_viewed`
   - `helpful_vote`

### Example Analytics Integration:

```typescript
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/config/firebase';

// Log review submission
logEvent(analytics, 'review_submitted', {
  locationId: location.id,
  rating: rating,
  category: category
});
```

---

## 🚨 Troubleshooting

### Common Issues

**Issue**: "Permission denied" errors
**Solution**: Check Firestore security rules allow the operation

**Issue**: Environment variables not loading
**Solution**: Restart dev server after adding `.env` file

**Issue**: Firebase not initialized
**Solution**: Ensure `firebase.ts` is imported before using Firestore

**Issue**: Timestamp conversion errors
**Solution**: Handle null timestamps with `?.toDate() || new Date()`

---

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase React Guide](https://firebase.google.com/docs/web/setup)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

---

**Setup Date**: October 18, 2025  
**Status**: ✅ Ready for Integration  
**Next**: Test rating submission and display
