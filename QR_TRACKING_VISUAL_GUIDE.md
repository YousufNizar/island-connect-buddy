# QR Code Tourist Tracking - Visual Guide

## 🎨 User Interface Overview

### 1. Safety Center - Main View

```
┌────────────────────────────────────────────┐
│  🛡️ Safety Center                          │
│  Stay informed and travel safely          │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  📍 Location Tracking                      │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  📱 QR Code Icon                     │ │
│  │                                      │ │
│  │  Stay Safe with QR Check-in          │ │
│  │                                      │ │
│  │  Scan QR codes at locations to let   │ │
│  │  authorities know where you are.     │ │
│  │                                      │ │
│  │  [Scan QR Code to Check In/Out]     │ │ <- Primary Action
│  │                                      │ │
│  │  [Generate QR Code (For Locations)] │ │ <- For Managers
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  🔔 Emergency Alerts (2)                   │
│                                            │
│  ⚠️ OVERDUE                                │
│  John Smith                                │
│  Last seen: Ella Rock Hiking Trail         │
│  Alert time: 30 minutes ago                │
│  [Contact Tourist Police] [Mark Resolved]  │
│                                            │
│  ⚠️ OVERDUE                                │
│  Emma Johnson                              │
│  Last seen: Sigiriya Rock Fortress         │
│  Alert time: 45 minutes ago                │
│  [Contact Tourist Police] [Mark Resolved]  │
└────────────────────────────────────────────┘

[Emergency Contacts Section...]
[Safety Alerts Section...]
[Safety Tips Section...]
```

---

## 2. QR Scanner - Check-In Flow

### Step 1: Scanner Opened
```
┌────────────────────────────────────────────┐
│  📷 Location Tracking              [X]     │
│  Scan QR code to check in/out              │
└────────────────────────────────────────────┘

Your Information
┌────────────────────────────────────────────┐
│  Full Name *                               │
│  [Enter your full name            ]        │
│                                            │
│  Phone Number *                            │
│  [Enter your phone number         ]        │
│                                            │
│  Emergency Contact (Optional)              │
│  [Emergency contact number        ]        │
│                                            │
│  Expected Visit Duration (minutes)         │
│  [60                              ]        │
│                                            │
│  We'll alert authorities if you don't      │
│  check out 15 minutes after this time      │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│                                            │
│         ┌──────────────────┐               │
│         │                  │               │
│         │   📷 Camera      │               │
│         │   Ready to scan  │               │
│         │                  │               │
│         └──────────────────┘               │
│                                            │
│         [Start Scanning]                   │
└────────────────────────────────────────────┘

🛡️ How it works
• Scan the QR code when entering a location
• Scan again when leaving
• If you don't check out in time, authorities
  will be alerted
• Your safety is our priority
```

### Step 2: Scanning Active
```
┌────────────────────────────────────────────┐
│  📷 Location Tracking              [X]     │
│  Scan QR code to check in/out              │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│   ┌────────────────────────────────────┐   │
│   │                                    │   │
│   │     [Camera View - Live Video]     │   │
│   │                                    │   │
│   │         Place QR code here         │   │
│   │                                    │   │
│   │     ┌───────────────────┐          │   │
│   │     │  Scanning frame   │          │   │
│   │     │  with highlight   │          │   │
│   │     └───────────────────┘          │   │
│   │                                    │   │
│   └────────────────────────────────────┘   │
│                                            │
│         [Stop Scanning]                    │
└────────────────────────────────────────────┘
```

### Step 3: Location Detected
```
┌────────────────────────────────────────────┐
│  📷 Location Tracking              [X]     │
│  Scan QR code to check in/out              │
└────────────────────────────────────────────┘

Location Detected
┌────────────────────────────────────────────┐
│  📍 Sigiriya Rock Fortress                 │
│  Type: Check-In                            │
└────────────────────────────────────────────┘

[✓ Check In]           [Scan Again]
```

### Step 4: Success!
```
┌────────────────────────────────────────────┐
│  ✅ Success!                                │
│                                            │
│  Checked in to Sigiriya Rock Fortress!     │
│  Have a safe visit.                        │
└────────────────────────────────────────────┘

[Close]
```

---

## 3. Active Check-Ins Warning

```
┌────────────────────────────────────────────┐
│  ⚠️ Active Check-ins (2)                   │
│                                            │
│  Sigiriya Rock Fortress                    │
│  Checked in: Oct 18, 2025 at 2:30 PM      │
│  Don't forget to check out!                │
│                                            │
│  Ella Rock Hiking Trail                    │
│  Checked in: Oct 18, 2025 at 10:00 AM     │
│  Don't forget to check out!                │
└────────────────────────────────────────────┘
```

---

## 4. QR Code Generator (For Location Managers)

```
┌────────────────────────────────────────────┐
│  📍 Generate Location QR Code              │
│  Create QR codes for check-in/check-out    │
└────────────────────────────────────────────┘

Location Name *
┌────────────────────────────────────────────┐
│  [Sigiriya Rock Fortress          ]        │
└────────────────────────────────────────────┘

Location ID (Optional)
┌────────────────────────────────────────────┐
│  [Auto-generated if left empty    ]        │
└────────────────────────────────────────────┘

QR Code Type
┌────────────────────────────────────────────┐
│  [Check-In ▼]                              │
└────────────────────────────────────────────┘

Generated QR Code:
┌────────────────────────────────────────────┐
│                                            │
│       ┌──────────────────────┐             │
│       │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │             │
│       │  ▓▓          ▓▓    │             │
│       │  ▓▓  ▓▓▓▓▓▓  ▓▓    │             │
│       │  ▓▓  ▓▓▓▓▓▓  ▓▓    │             │
│       │  ▓▓  ▓▓▓▓▓▓  ▓▓    │             │
│       │  ▓▓          ▓▓    │             │
│       │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │             │
│       └──────────────────────┘             │
│                                            │
│       Sigiriya Rock Fortress               │
│       📍 Check-In QR Code                  │
│                                            │
└────────────────────────────────────────────┘

[Download QR Code]    [Copy Data]

📋 Instructions
• Print and display this QR code at the
  location entrance
• Generate separate codes for check-in
  and check-out
• Ensure QR codes are placed in well-lit,
  accessible areas
```

---

## 5. Mobile View (Responsive)

### Portrait Mode
```
┌─────────────┐
│ 🛡️ Safety   │
│             │
│ Location    │
│ Tracking    │
│             │
│ [Scan QR]   │
│             │
│ [Generate]  │
│             │
│ Emergency   │
│ Alerts (2)  │
│             │
│ ⚠️ Alert 1  │
│ Details...  │
│             │
│ ⚠️ Alert 2  │
│ Details...  │
│             │
│ Emergency   │
│ Contacts    │
│             │
│ [Call Now]  │
└─────────────┘
```

---

## 6. Color Coding

### Status Colors
- 🟢 **Green** - Successfully checked out
- 🟡 **Yellow** - Currently checked in (active)
- 🔴 **Red** - Overdue / Alert generated
- 🔵 **Blue** - Information / Instructions

### Button Styles
- **Primary** (Blue gradient) - Main actions
- **Outline** (Border only) - Secondary actions
- **Destructive** (Red) - Emergency/Alert actions
- **Ghost** (Transparent) - Close/Cancel actions

---

## 7. Icon Guide

| Icon | Meaning |
|------|---------|
| 🛡️ | Safety & Security |
| 📍 | Location |
| 📷 | Camera / Scan |
| 📱 | QR Code |
| ✅ | Success / Confirmed |
| ⚠️ | Warning / Alert |
| 🔔 | Notification / Alert |
| ❌ | Close / Cancel |
| 🚨 | Emergency |
| 🚔 | Police / Authority |

---

## 8. Error States

### Camera Permission Denied
```
┌────────────────────────────────────────────┐
│  ❌ Error                                   │
│                                            │
│  Unable to access camera.                  │
│  Please check permissions.                 │
│                                            │
│  To fix:                                   │
│  1. Click the camera icon in address bar   │
│  2. Allow camera access                    │
│  3. Refresh the page                       │
│                                            │
│  [Close]                                   │
└────────────────────────────────────────────┘
```

### Invalid QR Code
```
┌────────────────────────────────────────────┐
│  ⚠️ Warning                                 │
│                                            │
│  Invalid QR code format                    │
│                                            │
│  Please scan a valid location QR code.     │
│                                            │
│  [Try Again]                               │
└────────────────────────────────────────────┘
```

### No Active Check-In
```
┌────────────────────────────────────────────┐
│  ⚠️ Warning                                 │
│                                            │
│  No active check-in found for this         │
│  location.                                 │
│                                            │
│  Please check in first before checking out.│
│                                            │
│  [OK]                                      │
└────────────────────────────────────────────┘
```

---

## 9. Loading States

### Scanning
```
┌────────────────────────────────────────────┐
│  📷 Scanning...                            │
│                                            │
│  [Animated spinner]                        │
│                                            │
│  Point camera at QR code                   │
└────────────────────────────────────────────┘
```

### Processing Check-In
```
┌────────────────────────────────────────────┐
│  ⏳ Processing...                          │
│                                            │
│  Checking you in to                        │
│  Sigiriya Rock Fortress                    │
└────────────────────────────────────────────┘
```

---

## 10. Authority Dashboard View

```
┌────────────────────────────────────────────┐
│  🚔 Safety Monitoring Dashboard            │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  Active Alerts: 3                          │
│  Resolved Today: 12                        │
│  Active Check-Ins: 247                     │
└────────────────────────────────────────────┘

Priority Alerts
┌────────────────────────────────────────────┐
│  🚨 HIGH PRIORITY                          │
│  John Smith - +94771234567                 │
│  Last seen: Ella Rock Hiking Trail         │
│  Overdue by: 45 minutes                    │
│  Emergency Contact: +1234567890            │
│                                            │
│  [Call Tourist] [Call Police] [Resolve]    │
└────────────────────────────────────────────┘

[View All Alerts] [Generate Report]
```

---

## 🎯 Design Principles

1. **Mobile-First**: Optimized for phone screens
2. **High Contrast**: Easy to read in bright sunlight
3. **Large Touch Targets**: Easy to tap while walking
4. **Clear Hierarchy**: Important actions prominent
5. **Minimal Steps**: Check-in in 3 taps
6. **Real-Time Feedback**: Instant confirmations
7. **Error Prevention**: Clear warnings and validations
8. **Accessibility**: Screen reader friendly

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Stack vertically)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (3 column layout)

All interactions optimized for touch and mouse!

---

**Visual Guide Complete! 🎨**
