# 🗺️ Mapbox Setup Guide - FREE & Easy!

## Why Mapbox Instead of Google Maps?

✅ **FREE** - No credit card required for signup  
✅ **Generous Free Tier** - 50,000 map loads/month (vs Google's 28,000)  
✅ **No Billing Required** - Start using immediately  
✅ **Beautiful Maps** - Customizable map styles  
✅ **Better Performance** - Faster loading times  
✅ **Easier Setup** - Just one token, no API enabling hassle  

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Free Mapbox Account
1. Go to: **https://account.mapbox.com/auth/signup/**
2. Sign up with your email (NO CREDIT CARD NEEDED!)
3. Confirm your email

### Step 2: Get Your Access Token
1. After signup, you'll see your **Default Public Token**
2. Or go to: **https://account.mapbox.com/access-tokens/**
3. Copy your default token (starts with `pk.`)

**Example token:**
```
pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNscHh5ejEyMzQ1Njc4OXBjZGVmZ2hpamtsIn0.1234567890abcdefghijklmnop
```

### Step 3: Add Token to .env File
Open: `c:\Users\gy\Desktop\wayfera\island-connect-buddy\.env`

Add your token:
```env
VITE_MAPBOX_ACCESS_TOKEN=pk.YOUR_ACTUAL_TOKEN_HERE
```

**Important:** Replace `pk.YOUR_MAPBOX_TOKEN_HERE` with your actual token!

### Step 4: Restart Dev Server
In your PowerShell terminal:
```powershell
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

### Step 5: Open Browser
Go to: **http://localhost:8080**

🎉 **You should see the map with markers!**

---

## 📊 Free Tier Limits

| Feature | Free Monthly Limit |
|---------|-------------------|
| Map Loads | 50,000 |
| Geocoding | 100,000 |
| Directions | 100,000 |
| Isochrones | 100,000 |

**Perfect for:**
- ✅ Development & Testing
- ✅ Personal Projects
- ✅ Small Apps
- ✅ Portfolios

---

## 🎨 What You Get

With Mapbox, your app now has:
- ✅ **Interactive Map** with smooth panning/zooming
- ✅ **Custom Markers** for all locations
- ✅ **Popups** when clicking markers
- ✅ **Navigation Controls** (zoom in/out)
- ✅ **Geolocate Control** (find user's location)
- ✅ **Multiple Map Styles** (streets, satellite, etc.)

---

## 🔧 Customization Options

### Change Map Style
In `src/components/MapboxMap.tsx`, change the `mapStyle` prop:

```tsx
// Available styles:
mapStyle="mapbox://styles/mapbox/streets-v12"        // Default streets
mapStyle="mapbox://styles/mapbox/outdoors-v12"      // Outdoor/hiking
mapStyle="mapbox://styles/mapbox/light-v11"         // Light theme
mapStyle="mapbox://styles/mapbox/dark-v11"          // Dark theme
mapStyle="mapbox://styles/mapbox/satellite-v9"      // Satellite view
mapStyle="mapbox://styles/mapbox/satellite-streets-v12"  // Hybrid
```

### Adjust Initial View
Change the default center and zoom:

```tsx
const [viewState, setViewState] = useState({
  longitude: 80.7718,  // Center of Sri Lanka
  latitude: 7.8731,
  zoom: 7              // Zoom level (1-20)
});
```

---

## 🐛 Troubleshooting

### Map Not Showing?

**Check 1: Token in .env file**
```bash
# Should look like this:
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1...your_token_here
```

**Check 2: Restarted dev server?**
```powershell
# After editing .env, always restart:
npm run dev
```

**Check 3: Browser console errors?**
- Press F12 to open DevTools
- Look for Mapbox-related errors
- Common: "Invalid access token" = wrong token

**Check 4: Token is public?**
- Go to https://account.mapbox.com/access-tokens/
- Make sure token has "Public" scope
- Secret tokens won't work in browser!

### Map Shows But Markers Missing?

Check console for errors. Likely:
- Location data format issue
- Check `src/data/locations.ts` has `lat` and `lng` fields

### Map Style Not Loading?

- Check internet connection
- Verify token is valid
- Try different map style

---

## 📚 Additional Resources

**Mapbox Documentation:**
- Getting Started: https://docs.mapbox.com/mapbox-gl-js/guides/
- API Reference: https://docs.mapbox.com/mapbox-gl-js/api/
- Examples: https://docs.mapbox.com/mapbox-gl-js/examples/

**React Map GL:**
- Docs: https://visgl.github.io/react-map-gl/
- Examples: https://visgl.github.io/react-map-gl/examples

---

## 🔐 Security Best Practices

### ✅ Safe to Commit
Your public token is **safe to commit to git** and share publicly. It only works from allowed URLs.

### 🔒 Restrict Token (Optional)
For production:
1. Go to https://account.mapbox.com/access-tokens/
2. Click on your token
3. Add **URL restrictions**:
   ```
   http://localhost:*
   https://yourdomain.com/*
   ```

This prevents others from using your token on their websites.

---

## 🆚 Mapbox vs Google Maps

| Feature | Mapbox | Google Maps |
|---------|--------|-------------|
| **Free Tier** | 50,000 loads/month | 28,000 loads/month |
| **Credit Card** | Not required | Required |
| **Billing Setup** | None | Required |
| **Signup Time** | 2 minutes | 5+ minutes |
| **API Enabling** | None needed | 2-3 APIs to enable |
| **Token/Key** | 1 token | Multiple keys |
| **Customization** | Excellent | Limited |
| **Performance** | Faster | Slower |

**Winner:** 🏆 Mapbox for this project!

---

## ✅ Checklist

Before asking for help, verify:
- [ ] I created a Mapbox account
- [ ] I copied my public access token (starts with `pk.`)
- [ ] I pasted it into `.env` file
- [ ] I replaced the placeholder text
- [ ] I saved the `.env` file
- [ ] I restarted the dev server
- [ ] I refreshed my browser
- [ ] I checked browser console (F12) for errors

---

**Status:** ✅ Mapbox integration complete!  
**What Changed:** Replaced Google Maps with Mapbox for better free tier and easier setup  
**Last Updated:** October 18, 2025
