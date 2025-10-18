# Instagram Sharing Feature

## Overview

The Instagram Sharing feature allows users to share their travel journal memories directly to the official Island Connect Buddy Instagram page (@islandconnectbuddy). This creates a community-driven feed of authentic experiences from real travelers.

## How It Works

### For Users (Tourists)

1. **Create a Journal Entry**
   - Add photos, location, description, and rating
   - Save to your personal travel journal

2. **Share to Instagram**
   - Click "Share to Instagram" button on any journal entry
   - Preview your submission
   - Optionally add your Instagram handle for credit
   - Submit for review

3. **Get Featured**
   - Our team reviews submissions
   - Selected photos are posted to @islandconnectbuddy
   - You get credited and tagged in the post
   - You receive a notification when featured

### User Flow

```
Journal Entry → Click "Share to Instagram" → 
Preview & Add Handle → Submit → 
Review by Team → Featured on Instagram → 
User Gets Credited & Notified
```

## User Interface

### Share Button
- **Location**: Bottom right of each journal entry card
- **Icon**: Instagram icon with gradient (pink to purple)
- **Text**: "Share to Instagram"
- **Style**: Ghost button with pink hover effect

### Share Dialog

#### Preview Section
- Shows the first photo from the entry
- Location name with map pin icon
- Description (truncated to 3 lines)
- Star rating and date

#### Information Alert
- Links to @islandconnectbuddy Instagram
- Explains the sharing process
- Branded with Instagram colors

#### Instagram Handle Input
- Optional text field
- Placeholder: "@yourusername"
- Helper text: "We'll tag you when we post your photo"

#### What Happens Next
- Numbered steps of the review process
- Team review information
- Credit and tagging details
- Notification promise

#### Action Buttons
- **Share to Instagram**: Gradient pink to purple
- **Cancel**: Outline style

### Success State
- Green checkmark icon
- Success message
- Confirmation text
- Auto-closes after 2 seconds

## Technical Implementation

### State Management

```typescript
const [shareDialogOpen, setShareDialogOpen] = useState(false);
const [selectedEntryForShare, setSelectedEntryForShare] = useState<JournalEntry | null>(null);
const [shareSuccess, setShareSuccess] = useState(false);
```

### Share Handler

```typescript
const handleShareToInstagram = (entry: JournalEntry) => {
  setSelectedEntryForShare(entry);
  setShareDialogOpen(true);
  setShareSuccess(false);
};
```

### Submit Function

```typescript
const submitToInstagram = () => {
  // Simulate upload (1.5 seconds)
  // Show success message
  // Auto-close after 2 seconds
  // In production: API call to backend
};
```

## Backend Integration (Future)

### API Endpoint

```typescript
POST /api/instagram/submit
Body: {
  entryId: string;
  userId: string;
  photo: string; // URL or file
  location: string;
  description: string;
  rating: number;
  date: string;
  instagramHandle?: string;
}
```

### Submission Flow

1. **User submits** → API receives submission
2. **Store in database** → `instagram_submissions` collection
3. **Notify moderators** → Email/Slack notification
4. **Manual review** → Team approves/rejects
5. **Post to Instagram** → Instagram Graph API
6. **Notify user** → In-app notification + email

### Database Schema

```typescript
interface InstagramSubmission {
  id: string;
  userId: string;
  entryId: string;
  photo: string;
  location: string;
  description: string;
  rating: number;
  date: string;
  instagramHandle?: string;
  status: 'pending' | 'approved' | 'rejected' | 'posted';
  submittedAt: Timestamp;
  reviewedAt?: Timestamp;
  reviewedBy?: string;
  postedAt?: Timestamp;
  instagramPostUrl?: string;
  rejectionReason?: string;
}
```

## Content Moderation

### Review Process

1. **Automatic Checks**
   - Image quality validation
   - Inappropriate content detection (ML)
   - Duplicate detection
   - Spam filtering

2. **Manual Review**
   - Team reviews submissions daily
   - Checks authenticity
   - Verifies location accuracy
   - Ensures community guidelines compliance

3. **Approval Criteria**
   - High-quality photos
   - Authentic experiences
   - Relevant to Sri Lanka tourism
   - Appropriate content
   - Good storytelling

### Rejection Reasons
- Low image quality
- Inappropriate content
- Spam/promotional
- Duplicate submission
- Location mismatch
- Copyright issues

## Instagram Integration

### Posting to Instagram

#### Option 1: Manual Posting
- Team downloads approved submissions
- Posts manually to @islandconnectbuddy
- Credits user in caption
- Tags user if handle provided

#### Option 2: Instagram Graph API (Automated)
```javascript
// Post to Instagram Business Account
POST https://graph.instagram.com/v18.0/{ig_user_id}/media
Body: {
  image_url: submission.photo,
  caption: `📍 ${submission.location}
  
  ${submission.description}
  
  ⭐ Rating: ${submission.rating}/5
  📅 ${formatDate(submission.date)}
  
  📸 Photo by ${submission.instagramHandle || 'traveler'}
  
  #IslandConnectBuddy #SriLanka #Travel`,
  user_tags: [submission.instagramHandle]
}
```

### Caption Format

```
📍 [Location Name]

[User Description]

⭐ Rating: [X]/5
📅 [Date]

📸 Photo by @[username]

#IslandConnectBuddy #SriLanka #TravelSriLanka 
#Explore #Adventure #[LocationTag]

Share your Sri Lankan adventures at 
islandconnectbuddy.com 🇱🇰
```

## User Notifications

### Submission Confirmation
```
✅ Submission Received!
Your memory from [Location] has been submitted 
to @islandconnectbuddy. We'll review it soon!
```

### Approval Notification
```
🎉 You're Featured!
Your photo from [Location] is now live on our 
Instagram! Check it out: [link]
```

### Rejection Notification (If applicable)
```
Thank you for sharing!
We couldn't feature your photo this time, but 
we'd love to see more of your adventures!
```

## Privacy & Permissions

### User Consent
- ✓ Users explicitly click "Share to Instagram"
- ✓ Clear explanation of what happens
- ✓ Optional attribution (can share anonymously)
- ✓ Can be revoked before posting

### Data Usage
- Only submitted entries are shared
- Private entries remain private
- Users control what gets shared
- Credit always given when requested

### Rights & Licensing
```
By sharing to Instagram, you grant Island Connect 
Buddy permission to:
- Post your photo on @islandconnectbuddy
- Use in marketing materials (with credit)
- Share on other social media platforms
- Feature in app galleries

You retain all rights to your original content.
We will always credit you when requested.
```

## Analytics & Metrics

### Track Submissions
- Total submissions
- Approval rate
- Average review time
- Most popular locations
- User engagement

### Instagram Performance
- Post reach and engagement
- Tagged user interactions
- New followers from features
- Click-through to app

## Gamification

### Rewards for Featured Users
- **Featured Creator Badge** 🏆
- **Instagram Star Badge** ⭐
- **Bonus eco points** (100 points)
- **Profile highlight** in app
- **Entry in monthly leaderboard**

### Achievements
- "First Feature" - First photo featured
- "5x Featured" - 5 photos featured
- "Viral Post" - Post reaches 10k+ likes
- "Community Star" - Most featured creator

## Community Guidelines

### What We Look For
- ✓ Authentic experiences
- ✓ High-quality photos
- ✓ Positive vibes
- ✓ Helpful descriptions
- ✓ Accurate locations
- ✓ Sustainable tourism

### What We Don't Allow
- ✗ Inappropriate content
- ✗ Spam or ads
- ✗ Fake reviews
- ✗ Stolen photos
- ✗ Offensive content
- ✗ Dangerous activities

## Best Practices

### For Users
1. **Take quality photos**
   - Good lighting
   - Clear focus
   - Interesting composition
   - Shows location essence

2. **Write engaging descriptions**
   - Be authentic
   - Share personal insights
   - Include helpful tips
   - Tell a story

3. **Add context**
   - Mention best times to visit
   - Share hidden gems
   - Include practical advice
   - Note accessibility info

4. **Respect privacy**
   - Don't include other people without consent
   - Avoid sensitive locations
   - Respect local customs

### For Moderators
1. Review within 24 hours
2. Provide feedback if rejected
3. Credit users properly
4. Engage with comments
5. Track performance metrics

## Future Enhancements

### Phase 2
- [ ] Direct Instagram API integration
- [ ] Automated posting workflow
- [ ] Video support (Reels)
- [ ] Stories integration
- [ ] Instagram carousel posts

### Phase 3
- [ ] User voting on submissions
- [ ] Monthly photo contests
- [ ] Featured creator of the month
- [ ] Instagram integration for login
- [ ] Cross-posting to other platforms

### Phase 4
- [ ] Creator dashboard with analytics
- [ ] Direct messaging with featured users
- [ ] Collaboration opportunities
- [ ] Brand partnerships
- [ ] Professional photographer program

## Support

### For Users
- **Having trouble sharing?** Check your internet connection
- **Not seeing your post?** It may take 24-48 hours for review
- **Want to remove a submission?** Contact support@islandconnectbuddy.com

### For Questions
- Follow @islandconnectbuddy on Instagram
- DM us for feature inquiries
- Check app notifications for updates

---

**Share your Sri Lankan adventures with the world! 📸✨**

Official Instagram: [@islandconnectbuddy](https://instagram.com/islandconnectbuddy)
