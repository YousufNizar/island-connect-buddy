# 📊 Rating & Sustainability System Documentation

## Overview
A comprehensive rating and sustainability tracking system for the Sri Lanka Travel Connect application. This system allows users to rate locations, view sustainability metrics, and make informed travel decisions.

---

## 🏗️ Architecture

### Component Structure
```
src/
├── types/
│   └── ratings.ts                  # TypeScript interfaces
├── services/
│   └── ratingService.ts            # Business logic
└── components/
    ├── RatingForm.tsx              # User review submission
    ├── RatingsDisplay.tsx          # Display reviews
    ├── SustainabilityCard.tsx      # Sustainability metrics
    └── LocationDetailModal.tsx     # Main integration
```

---

## 📝 Type Definitions

### UserRating Interface
```typescript
interface UserRating {
  id: string;                    // Unique review ID
  locationId: number;            // Associated location
  userId: string;                // User identifier
  rating: number;                // 1-5 stars
  comment: string;               // Review text (10-300 chars)
  timestamp: Date;               // When posted
  category: 'safety' | 'eco_friendly' | 'cultural' | 'general';
  helpful_count: number;         // Community votes
}
```

### SustainabilityMetrics Interface
```typescript
interface SustainabilityMetrics {
  localOwnership: number;        // 0-100: Community ownership
  ecoFriendly: number;          // 0-100: Environmental practices
  culturalValue: number;        // 0-100: Heritage preservation
  touristImpact: number;        // 0-100: Visitor sustainability
}
```

---

## 🎯 Features

### 1. Rating Form Component
**Location**: `src/components/RatingForm.tsx`

#### Features
- ⭐ Interactive 5-star rating system
- 📝 Comment submission (10-300 characters)
- 🏷️ Category selection:
  - 🛡️ Safety
  - 🌿 Eco-Friendly
  - 🏛️ Cultural
  - ⭐ General
- ✅ Form validation
- 🎨 Emoji feedback for rating selection

#### Usage
```typescript
<RatingForm
  locationId={location.id}
  locationName={location.name}
  onSubmit={(rating, comment, category) => {
    // Handle submission (save to Firebase)
  }}
  isLoading={false}
/>
```

#### Validation Rules
- Rating: Required (1-5 stars)
- Comment: Minimum 10 characters, Maximum 300 characters
- Category: Auto-selected (default: 'general')

---

### 2. Ratings Display Component
**Location**: `src/components/RatingsDisplay.tsx`

#### Features
- 📊 Average rating calculation
- 📈 Rating distribution chart
- 💬 Individual review cards
- 👍 "Helpful" voting system
- 🏷️ Category badges
- 👤 Anonymous user display

#### Usage
```typescript
<RatingsDisplay
  averageRating={4.5}
  totalReviews={127}
  reviews={reviewsArray}
  onHelpful={(reviewId) => {
    // Update helpful count
  }}
/>
```

#### Display Format
```
┌─────────────────────────────────────┐
│ Guest Reviews          127 reviews  │
├─────────────────────────────────────┤
│      4.5                            │
│     ★★★★★                           │
│  Based on 127 ratings               │
│                                     │
│  5★ ▓▓▓▓▓▓▓▓▓▓░░░░░ 78             │
│  4★ ▓▓▓▓▓░░░░░░░░░░ 32             │
│  3★ ▓▓░░░░░░░░░░░░░ 12             │
│  2★ ▓░░░░░░░░░░░░░░  4             │
│  1★ ░░░░░░░░░░░░░░░  1             │
└─────────────────────────────────────┘
```

---

### 3. Sustainability Card Component
**Location**: `src/components/SustainabilityCard.tsx`

#### Features
- 🌍 Overall sustainability score (0-100)
- 📊 Four metric breakdowns:
  - 👥 Local Ownership (35% weight)
  - 🌿 Eco-Friendly (30% weight)
  - 🎭 Cultural Value (20% weight)
  - 📈 Tourist Impact (15% weight)
- 🎨 Color-coded levels:
  - 🟢 High (80-100)
  - 🟡 Moderate (50-79)
  - 🔴 Low (0-49)
- 💡 Context-specific travel tips

#### Usage
```typescript
<SustainabilityCard
  score={85}
  metrics={{
    localOwnership: 95,
    ecoFriendly: 88,
    culturalValue: 75,
    touristImpact: 70
  }}
/>
```

#### Calculation Formula
```typescript
score = 
  (localOwnership × 0.35) +
  (ecoFriendly × 0.30) +
  (culturalValue × 0.20) +
  (touristImpact × 0.15)
```

**Example**:
```
Local: 95 × 0.35 = 33.25
Eco:   88 × 0.30 = 26.40
Cult:  75 × 0.20 = 15.00
Tour:  70 × 0.15 = 10.50
────────────────────────
Total:            85.15 → 85 (High)
```

---

## 🔧 Rating Service

### Methods

#### `calculateAverageRating(ratings: UserRating[]): number`
Calculates the average rating from an array of reviews.

```typescript
const avg = RatingService.calculateAverageRating(reviews);
// Example: [5, 4, 5, 3, 4] → 4.2
```

#### `calculateSustainabilityScore(metrics: SustainabilityMetrics): number`
Computes weighted sustainability score.

```typescript
const score = RatingService.calculateSustainabilityScore({
  localOwnership: 90,
  ecoFriendly: 85,
  culturalValue: 80,
  touristImpact: 75
});
// Returns: 84
```

#### `getSustainabilityLevel(score: number): 'High' | 'Moderate' | 'Low'`
Determines sustainability level from score.

```typescript
RatingService.getSustainabilityLevel(85); // "High"
RatingService.getSustainabilityLevel(65); // "Moderate"
RatingService.getSustainabilityLevel(40); // "Low"
```

#### `getSustainabilityColor(level: string): string`
Returns Tailwind CSS classes for level.

```typescript
RatingService.getSustainabilityColor('High');
// "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
```

#### `getSustainabilityIcon(level: string): string`
Returns emoji icon for level.

```typescript
RatingService.getSustainabilityIcon('High');     // "🟢"
RatingService.getSustainabilityIcon('Moderate'); // "🟡"
RatingService.getSustainabilityIcon('Low');      // "🔴"
```

---

## 🔗 Integration with LocationDetailModal

### Updated Structure
```typescript
<LocationDetailModal location={location}>
  {/* Existing content */}
  
  {/* 1. Sustainability Section */}
  <SustainabilityCard 
    score={location.sustainabilityScore}
    metrics={location.breakdown}
  />
  
  {/* 2. Rating Form */}
  <RatingForm 
    locationId={location.id}
    locationName={location.name}
    onSubmit={handleRatingSubmit}
  />
  
  {/* 3. Reviews Display */}
  <RatingsDisplay
    averageRating={location.rating}
    totalReviews={location.reviewCount}
    reviews={reviews}
    onHelpful={handleHelpful}
  />
</LocationDetailModal>
```

---

## 🗄️ Data Flow

### Submitting a Review
```
User fills form
     ↓
Validation checks
     ↓
onSubmit callback
     ↓
Save to Firebase
     ↓
Update local state
     ↓
Show success toast
     ↓
Refresh reviews
```

### Marking Review as Helpful
```
User clicks "Helpful"
     ↓
onHelpful callback
     ↓
Update Firebase counter
     ↓
Increment local count
     ↓
Show feedback toast
```

---

## 🔥 Firebase Integration (TODO)

### Firestore Structure
```
locations/
  └── {locationId}/
      ├── ratings/
      │   └── {ratingId}/
      │       ├── userId: string
      │       ├── rating: number
      │       ├── comment: string
      │       ├── category: string
      │       ├── timestamp: timestamp
      │       └── helpful_count: number
      └── sustainability/
          ├── score: number
          └── metrics/
              ├── localOwnership: number
              ├── ecoFriendly: number
              ├── culturalValue: number
              └── touristImpact: number
```

### Query Examples

#### Fetch Reviews
```typescript
const reviewsRef = collection(db, 'locations', locationId, 'ratings');
const q = query(reviewsRef, orderBy('timestamp', 'desc'), limit(10));
const snapshot = await getDocs(q);
const reviews = snapshot.docs.map(doc => doc.data());
```

#### Submit Review
```typescript
const reviewRef = collection(db, 'locations', locationId, 'ratings');
await addDoc(reviewRef, {
  userId: currentUser.uid,
  rating: 5,
  comment: "Amazing experience!",
  category: "general",
  timestamp: serverTimestamp(),
  helpful_count: 0
});
```

#### Update Helpful Count
```typescript
const reviewRef = doc(db, 'locations', locationId, 'ratings', reviewId);
await updateDoc(reviewRef, {
  helpful_count: increment(1)
});
```

---

## 🎨 UI/UX Features

### Interactive Elements
- ✨ Hover effects on star ratings
- 🎯 Click animations on buttons
- 📱 Responsive design (mobile-first)
- 🌈 Dark mode support
- ♿ Accessibility (ARIA labels)

### User Feedback
- ✅ Toast notifications
- 🔄 Loading states
- ⚠️ Validation messages
- 📊 Real-time updates

---

## 🧪 Testing

### Component Testing
```typescript
// Test rating validation
it('should not submit without rating', () => {
  render(<RatingForm {...props} />);
  fireEvent.click(screen.getByText('Submit Review'));
  expect(screen.getByText('Please select a rating')).toBeInTheDocument();
});

// Test comment length validation
it('should enforce minimum comment length', () => {
  render(<RatingForm {...props} />);
  const textarea = screen.getByPlaceholderText(/Tell others/);
  fireEvent.change(textarea, { target: { value: 'Short' } });
  fireEvent.click(screen.getByText('Submit Review'));
  expect(screen.getByText('Please write at least 10 characters')).toBeInTheDocument();
});
```

---

## 📊 Analytics Events

### Track User Interactions
```typescript
// Review submitted
analytics.track('review_submitted', {
  locationId: number,
  rating: number,
  category: string,
  commentLength: number
});

// Helpful vote
analytics.track('review_helpful_vote', {
  reviewId: string,
  locationId: number
});

// Sustainability viewed
analytics.track('sustainability_viewed', {
  locationId: number,
  score: number,
  level: string
});
```

---

## 🚀 Future Enhancements

### Short-term
- [ ] Photo upload with reviews
- [ ] Review editing (within 24 hours)
- [ ] Report inappropriate content
- [ ] Sort reviews (recent, helpful, rating)
- [ ] Filter by category

### Medium-term
- [ ] User reputation system
- [ ] Verified traveler badges
- [ ] Review responses from location owners
- [ ] Multi-language support
- [ ] Review moderation dashboard

### Long-term
- [ ] AI-powered sentiment analysis
- [ ] Personalized review recommendations
- [ ] Gamification (badges, points)
- [ ] Social sharing
- [ ] Video reviews

---

## 📱 Mobile Optimizations

- Sticky rating form header
- Bottom sheet for reviews
- Touch-optimized star rating
- Swipe gestures for reviews
- Optimized image loading

---

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators

---

## 🔐 Security Considerations

- Rate limiting (1 review per user per location)
- Comment sanitization (prevent XSS)
- Profanity filter
- User authentication required
- Spam detection

---

## 📚 References

- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [React Hook Form](https://react-hook-form.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Last Updated**: October 18, 2025  
**Version**: 1.0.0  
**Maintained By**: Development Team
