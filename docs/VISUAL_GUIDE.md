# 🎨 Rating System - Visual Component Guide

## Component Previews

### 1. 📝 Rating Form Component

```
┌─────────────────────────────────────────────────────┐
│ 💬 Share Your Experience                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ What type of rating is this?                       │
│ ┌────────────┬────────────┐                       │
│ │ 🛡️ Safety  │ 🌿 Eco-Fr… │ ← Active: Blue bg    │
│ ├────────────┼────────────┤                       │
│ │ 🏛️ Cultural│ ⭐ General │                       │
│ └────────────┴────────────┘                       │
│                                                     │
│ Rate this location                                  │
│ ★ ★ ★ ★ ★  ← Interactive stars                    │
│ 🤩 Excellent! ← Dynamic feedback                   │
│                                                     │
│ Your comment (45/300)                              │
│ ┌─────────────────────────────────────────────┐   │
│ │ This place is absolutely stunning! The eco  │   │
│ │ practices are impressive...                 │   │
│ └─────────────────────────────────────────────┘   │
│ Minimum 10 characters. Be respectful.             │
│                                                     │
│ ┌───────────────────────────────────────────┐     │
│ │        📤 Submit Review                   │     │
│ └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

**States:**
- **Default**: Gray stars, no emoji
- **Hover**: Yellow stars light up
- **Selected**: Stars fill with yellow
- **5 stars**: 🤩 Excellent!
- **4 stars**: 😊 Good!
- **3 stars**: 😐 Average
- **2 stars**: 😟 Poor
- **1 star**: 😠 Terrible

---

### 2. 📊 Ratings Display Component

```
┌─────────────────────────────────────────────────────┐
│ Guest Reviews                      127 reviews      │
├─────────────────────────────────────────────────────┤
│                                                     │
│          4.5            5★ ▓▓▓▓▓▓▓▓▓▓░░░░░  78    │
│         ★★★★★           4★ ▓▓▓▓▓░░░░░░░░░░  32    │
│   Based on 127 ratings  3★ ▓▓░░░░░░░░░░░░░  12    │
│                         2★ ▓░░░░░░░░░░░░░░   4    │
│                         1★ ░░░░░░░░░░░░░░░   1    │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Recent Reviews                                      │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 👤 Anonymous Traveler    🌿 Eco-Friendly   │   │
│ │    Oct 10, 2024                             │   │
│ │                                             │   │
│ │ ★★★★★                                       │   │
│ │ Absolutely stunning! The eco-friendly       │   │
│ │ practices here are amazing...               │   │
│ │                                             │   │
│ │ 👍 Helpful (12)                             │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 👤 Anonymous Traveler    🏛️ Cultural       │   │
│ │    Oct 15, 2024                             │   │
│ │                                             │   │
│ │ ★★★★☆                                       │   │
│ │ Great cultural experience. The local        │   │
│ │ guides are very knowledgeable...            │   │
│ │                                             │   │
│ │ 👍 Helpful (8)                              │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Category Badges:**
- 🛡️ Safety - Blue badge
- 🌿 Eco-Friendly - Green badge
- 🏛️ Cultural - Purple badge
- ⭐ General - Yellow badge

---

### 3. 🌍 Sustainability Card Component

#### High Sustainability (80-100)
```
┌─────────────────────────────────────────────────────┐
│ 🟢 Sustainability Score              [High]         │
│ 🌟 This destination excels in sustainable practices!│
├─────────────────────────────────────────────────────┤
│                                                     │
│ 85/100                    Highly Sustainable        │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░                              │
│                                                     │
│ 👥 Local Ownership              95%                │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░                           │
│    Community-managed business                      │
│                                                     │
│ 🌿 Eco-Friendly                 88%                │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░                           │
│    Environmental practices                         │
│                                                     │
│ 🎭 Cultural Value               75%                │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░                           │
│    Heritage preservation                           │
│                                                     │
│ 📈 Tourist Impact               70%                │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░                           │
│    Sustainable visitor flow                        │
│                                                     │
│ ───────────────────────────────────────────────    │
│ 💡 Travel Tip:                                     │
│ ✓ Support local businesses while visiting          │
│ ✓ Follow eco-friendly guidelines                   │
│ ✓ Respect cultural practices                       │
└─────────────────────────────────────────────────────┘
```

#### Moderate Sustainability (50-79)
```
┌─────────────────────────────────────────────────────┐
│ 🟡 Sustainability Score          [Moderate]         │
│ ⚠️ Good practices, but room for improvement        │
├─────────────────────────────────────────────────────┤
│ 65/100               Moderately Sustainable         │
│ ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░                              │
│                                                     │
│ 💡 Travel Tip:                                     │
│ → Ask about sustainable practices                   │
│ → Support local employment                          │
│ → Minimize waste during visit                       │
└─────────────────────────────────────────────────────┘
```

#### Low Sustainability (0-49)
```
┌─────────────────────────────────────────────────────┐
│ 🔴 Sustainability Score             [Low]           │
│ ⚠️ Limited sustainable practices                   │
├─────────────────────────────────────────────────────┤
│ 35/100                    Needs Improvement         │
│ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░                             │
│                                                     │
│ 💡 Travel Tip:                                     │
│ ⚠️ Consider sustainability concerns                │
│ ⚠️ Engage responsibly with locals                  │
│ ⚠️ Minimize environmental impact                   │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Color Schemes

### Sustainability Levels
```css
/* High - Green */
background: #dcfce7  (light)
text: #166534       (dark)
dark-bg: #14532d30  (dark mode)
dark-text: #4ade80  (dark mode)

/* Moderate - Yellow */
background: #fef9c3  (light)
text: #854d0e       (dark)
dark-bg: #78350f30  (dark mode)
dark-text: #facc15  (dark mode)

/* Low - Red */
background: #fee2e2  (light)
text: #991b1b       (dark)
dark-bg: #7f1d1d30  (dark mode)
dark-text: #ef4444  (dark mode)
```

### Rating Stars
```css
/* Filled */
fill: #facc15      (yellow-400)
color: #facc15

/* Empty */
color: #9ca3af    (muted-foreground)
```

### Category Badges
```css
/* Safety */
background: #dbeafe
color: #1e40af

/* Eco-Friendly */
background: #d1fae5
color: #065f46

/* Cultural */
background: #e9d5ff
color: #6b21a8

/* General */
background: #fef3c7
color: #92400e
```

---

## 📱 Responsive Behavior

### Mobile (< 768px)
```
- Rating form: Full width
- Category buttons: 2 columns
- Stars: Larger touch targets (40px)
- Reviews: Stacked cards
- Progress bars: Full width
```

### Tablet (768px - 1024px)
```
- Rating form: Max width 600px
- Category buttons: 2x2 grid
- Stars: Medium size (32px)
- Reviews: Single column
- Progress bars: Smooth transitions
```

### Desktop (> 1024px)
```
- Rating form: Max width 700px
- Category buttons: Flexible grid
- Stars: Standard size (32px)
- Reviews: May show in columns
- Progress bars: Animated on scroll
```

---

## 🎭 Animations

### Star Rating
```css
transition: all 150ms ease-in-out
hover: scale(1.1)
active: scale(0.95)
```

### Category Buttons
```css
active: scale(1.05)
transition: transform 200ms
```

### Progress Bars
```css
transition: width 500ms ease-out
animation: fill from left to right
```

### Card Hover
```css
hover: shadow-md
transition: box-shadow 300ms
```

---

## ♿ Accessibility

### Keyboard Navigation
```
Tab: Move between form elements
Enter/Space: Select stars, submit form
Arrow keys: Navigate star rating
Escape: Close modal
```

### Screen Reader Support
```html
<button aria-label="Rate 5 stars">★</button>
<div role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
<button aria-label="Mark review as helpful">👍</button>
```

### Focus Indicators
```css
focus: ring-2 ring-primary
focus-visible: outline-2 outline-offset-2
```

---

## 🔧 Interactive States

### Button States
```
Default:  bg-muted text-muted-foreground
Hover:    bg-muted/80
Active:   bg-primary text-primary-foreground scale-105
Disabled: opacity-50 cursor-not-allowed
```

### Input States
```
Default:  border-border
Focus:    border-primary ring-1 ring-primary
Error:    border-destructive
Success:  border-green-500
```

---

## 📊 Data Visualization

### Rating Distribution Bars
```
[5★] ▓▓▓▓▓▓▓▓▓▓░░░░░  (61%)
[4★] ▓▓▓▓▓░░░░░░░░░░  (25%)
[3★] ▓▓░░░░░░░░░░░░░  ( 9%)
[2★] ▓░░░░░░░░░░░░░░  ( 3%)
[1★] ░░░░░░░░░░░░░░░  ( 1%)
```

**Legend:**
- ▓ = Filled (yellow-400)
- ░ = Empty (muted)
- Width = Percentage of total reviews

---

## 🎯 Component Integration Flow

```
LocationDetailModal
├── Header (Image + Title)
├── About Section
├── Info Grid (Hours, Price, Location)
├── Safety Status
│
├── 🌍 SustainabilityCard
│   ├── Score Display (85/100)
│   ├── Level Badge (High/Mod/Low)
│   └── 4 Metric Breakdowns
│
├── 📝 RatingForm (Toggle)
│   ├── Category Selection
│   ├── Star Rating
│   └── Comment Input
│
├── 📊 RatingsDisplay
│   ├── Average & Distribution
│   └── Review Cards List
│
└── Action Buttons
    ├── Add to Trip
    └── Toggle Rating Form
```

---

## 💡 Usage Tips

### Best Practices
1. Always show sustainability card first
2. Collapse rating form by default
3. Show most recent reviews first
4. Limit initial reviews to 5
5. Implement "Load More" pagination

### User Experience
- Pre-fill category based on location type
- Auto-save draft reviews
- Highlight user's own review
- Show edit option (within 24hrs)
- Confirm before deleting review

---

**Visual Guide Version**: 1.0.0  
**Last Updated**: October 18, 2025  
**Figma Designs**: Coming soon
