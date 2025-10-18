# 🔧 Troubleshooting Guide - Website Not Showing

## ✅ FIXED! Here's what was wrong:

### The Problem
Your website wasn't loading because:
1. **Firebase was not configured** - The `.env` file was missing Firebase credentials
2. **The app crashed** trying to initialize Firebase with missing values

### The Solution
I updated the Firebase configuration to:
- ✅ Use **demo mode** when Firebase credentials are missing
- ✅ **Gracefully fall back** to default location data
- ✅ Show a warning in console instead of crashing
- ✅ Allow the app to work **without Firebase** until you're ready

---

## 🚀 Your Website is Now Working!

### Access Your Website
```
http://localhost:8081
```

The app should now display:
- ✅ All location cards
- ✅ Map view
- ✅ Location details
- ✅ Default ratings (from location data)
- ⚠️ Firebase features disabled (until you configure it)

---

## 🔥 To Enable Firebase (Optional)

### Quick Setup (5 minutes):

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create project: "Sri Lanka Travel Connect"
   - Enable Firestore Database (test mode)

2. **Get Credentials**
   - Project Settings → General
   - Copy Firebase config

3. **Update `.env` file**:
```env
# Keep your existing Google Maps key
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDltNqu0xG8AFEVVYignjFumKliO7E_zAg

# Add Firebase credentials (from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

4. **Restart server**:
```bash
Ctrl + C  # Stop server
npm run dev  # Start again
```

---

## 🎯 What Works Now (Without Firebase)

### ✅ Fully Functional
- Browse all locations
- View location details
- See sustainability scores (from location data)
- View ratings (from location data)
- Interactive map
- Search functionality
- All UI components

### ⚠️ Disabled (Until Firebase Setup)
- Submitting new reviews
- Real-time rating updates
- Helpful voting on reviews
- User-generated content

---

## 🐛 Common Issues & Fixes

### Issue 1: "Port 8080 is in use"
**Solution**: App automatically uses port 8081 instead
```
✓ Local: http://localhost:8081/
```

### Issue 2: "Cannot see anything"
**Solution**: Check browser console (F12) for errors
- Clear browser cache (Ctrl + Shift + Delete)
- Hard reload (Ctrl + Shift + R)

### Issue 3: "Firebase errors in console"
**Solution**: Ignore them! The app works without Firebase
- Yellow warning is okay: "⚠️ Firebase not configured. Using demo mode."
- Red errors mean you need to add Firebase credentials

### Issue 4: "Reviews not submitting"
**Solution**: This is expected without Firebase
- Add Firebase credentials to enable this feature
- Or see error toast notification

---

## 📱 Testing Your Website

### 1. Check Homepage
```
http://localhost:8081/
```
Should show:
- Hero section
- Location cards with images
- Search bar
- Map view

### 2. Click a Location
Should show:
- Location details modal
- Sustainability card
- Rating display
- Info (hours, price, safety)

### 3. Try Rating Form
- Click "Write a Review"
- Fill form
- Without Firebase: Shows warning toast
- With Firebase: Submits successfully

---

## 🎨 Visual Confirmation

### You should see:

```
┌────────────────────────────────────────┐
│  🏝️ DISCOVER SRI LANKA                 │
│  [Search.....................] 🔍       │
├────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │ Loc1 │  │ Loc2 │  │ Loc3 │        │
│  │ ⭐4.5│  │ ⭐4.8│  │ ⭐4.2│        │
│  └──────┘  └──────┘  └──────┘        │
│                                        │
│  🗺️ Interactive Map                    │
│  ┌────────────────────────────────┐   │
│  │  📍 Markers on Sri Lanka map  │   │
│  └────────────────────────────────┘   │
└────────────────────────────────────────┘
```

---

## 🔍 Browser Console Check

Open browser console (F12):

### ✅ Good Messages (Ignore These):
```
⚠️ Firebase not configured. Using demo mode.
```

### ❌ Bad Messages (Need Fixing):
```
❌ TypeError: Cannot read property...
❌ Uncaught ReferenceError...
❌ Failed to fetch...
```

If you see bad messages, let me know!

---

## 📊 Performance Tips

### If website loads slowly:

1. **Check terminal** for build errors
2. **Clear browser cache**
3. **Restart dev server**:
```bash
Ctrl + C
npm run dev
```

4. **Check port**:
```bash
# If port issues, change in vite.config.ts
server: {
  port: 3000  // Change to any free port
}
```

---

## 🆘 Still Not Working?

### Check These:

1. **Terminal shows no errors?**
```bash
npm run dev
# Should show: "ready in XXX ms"
```

2. **Port is correct?**
```
Local: http://localhost:8081/
```

3. **Browser console (F12) shows?**
- Check for red errors
- Copy error message

4. **Internet connection?**
- Google Maps needs internet
- External images need internet

---

## ✅ Current Status

| Feature | Status |
|---------|--------|
| Website Loading | ✅ WORKING |
| Location Cards | ✅ WORKING |
| Map View | ✅ WORKING |
| Location Details | ✅ WORKING |
| Sustainability Display | ✅ WORKING |
| Rating Display | ✅ WORKING |
| Firebase Integration | ⚠️ OPTIONAL (Demo Mode) |

---

## 🎉 You're All Set!

Your website is now fully functional!

- Browse locations ✅
- View details ✅
- Check sustainability scores ✅
- See ratings and reviews ✅
- Interactive maps ✅

**Firebase is optional** - add it when you're ready to collect real user reviews!

---

**Last Updated**: Just now  
**Status**: ✅ Fixed & Working  
**Dev Server**: Running on http://localhost:8081
