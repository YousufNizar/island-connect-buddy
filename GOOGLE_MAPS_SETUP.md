# Google Maps API Setup Guide

## ⚠️ Current Issue
Your Google Maps API key is invalid, which is why the map doesn't display. Follow these steps to fix it.

## Step-by-Step Setup

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select a Project
- Click on the project dropdown at the top
- Click "New Project" if you don't have one
- Name it something like "Island Connect Buddy"
- Click "Create"

### 3. Enable Required APIs
Go to: https://console.cloud.google.com/apis/library

Enable these APIs (search for each and click "Enable"):
- ✅ **Maps JavaScript API** (REQUIRED - for displaying the map)
- ✅ **Places API** (REQUIRED - for location search)
- ✅ **Geocoding API** (Recommended - for address lookup)

### 4. Create API Key
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "**+ CREATE CREDENTIALS**" → "**API Key**"
3. Copy your new API key (it looks like: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 5. (Optional but Recommended) Restrict Your API Key
Click on your newly created API key to edit it:

**Application Restrictions:**
- Select "**HTTP referrers (web sites)**"
- Add these referrers:
  ```
  http://localhost:*
  http://localhost:8080/*
  http://localhost:8081/*
  https://yourdomain.com/*
  ```

**API Restrictions:**
- Select "**Restrict key**"
- Select only the APIs you're using:
  - Maps JavaScript API
  - Places API
  - Geocoding API

Click "**Save**"

### 6. Update Your .env File
Open `c:\Users\gy\Desktop\wayfera\island-connect-buddy\.env` and replace:

```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_NEW_API_KEY_HERE
```

**Example:**
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 7. Restart Your Dev Server
In your terminal (PowerShell):
```powershell
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 8. Refresh Your Browser
Open http://localhost:8081 and the map should now display!

---

## Common Issues

### ❌ "InvalidKey" Error
**Cause:** API key is invalid or not enabled properly
**Fix:** 
1. Make sure you copied the ENTIRE API key
2. Check that Maps JavaScript API is enabled
3. Wait 1-2 minutes after creating the key (propagation time)

### ❌ "This page can't load Google Maps correctly"
**Cause:** Billing not enabled on Google Cloud project
**Fix:** 
1. Go to: https://console.cloud.google.com/billing
2. Enable billing (Google gives $200 free credits per month)
3. For development with low traffic, you likely won't be charged

### ❌ "RefererNotAllowedMapError"
**Cause:** Your website URL is not in the allowed referrers list
**Fix:**
1. Go to API key settings
2. Add `http://localhost:*` to allowed referrers

### ❌ Map shows but is grey/blank
**Cause:** API key restrictions are too strict or wrong APIs enabled
**Fix:**
1. Temporarily remove all restrictions
2. Test if map works
3. Then add restrictions back one by one

---

## Free Tier Limits

Google Maps offers **$200 free credits per month**, which includes:
- **28,000+ map loads per month** (free)
- **40,000 place searches per month** (free)

For a small personal project or development, you **won't be charged**.

---

## Cost Breakdown (if you exceed free tier)

| Feature | Cost (per 1,000 requests) | Free Monthly Limit |
|---------|---------------------------|-------------------|
| Map loads | $7 | 28,000 |
| Places API | $17 | 40,000 |
| Geocoding | $5 | 40,000 |

**Your app:** With normal development/testing, you'll stay well within free limits.

---

## Quick Test

After setup, open browser console at http://localhost:8081 and check:
- ✅ No "InvalidKey" errors
- ✅ Map displays with markers
- ✅ Search bar works

---

## Need Help?

If you still see errors after following these steps:
1. Check browser console for specific error messages
2. Verify API key is exactly as shown in Google Cloud Console (no extra spaces)
3. Try creating a completely new API key
4. Make sure you're editing the correct `.env` file in the project root

---

**Created:** October 18, 2025
**Last Updated:** October 18, 2025
