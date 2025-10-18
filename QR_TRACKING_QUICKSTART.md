# QR Code Tourist Tracking - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### For Tourists

#### Step 1: Enable Camera Permissions
- When prompted, allow camera access in your browser
- This is required to scan QR codes

#### Step 2: Navigate to Safety Center
1. Open the Island Connect Buddy app
2. Tap on the **Safety** tab (shield icon)
3. Scroll to **Location Tracking** section

#### Step 3: Scan QR Code at Location
1. Click **"Scan QR Code to Check In/Out"**
2. Fill in your information:
   - **Name**: Your full name
   - **Phone**: Your mobile number (for identification)
   - **Emergency Contact**: Optional backup contact
   - **Visit Duration**: How long you plan to stay (default: 60 min)
3. Click **"Start Scanning"**
4. Point your camera at the location's check-in QR code
5. Once detected, review the location name
6. Click **"✓ Check In"**

#### Step 4: Enjoy Your Visit! 🌴
- Keep your phone with you
- Note your expected check-out time
- Explore safely!

#### Step 5: Check Out When Leaving
1. Open the QR scanner again
2. Scan the check-out QR code at the exit
3. Click **"✓ Check Out"**
4. You'll see a confirmation message

### Important Safety Notes ⚠️

- **Don't forget to check out!** If you don't check out 15 minutes after your expected time, authorities will be alerted
- **Keep your phone charged** so you can check out
- **Multiple locations?** The app will warn you if you're checked into multiple places
- **Change of plans?** You can check out early if you leave earlier than expected

---

## 🏛️ For Location Managers

### Step 1: Generate QR Codes
1. Go to Safety Center
2. Click **"Generate QR Code (For Locations)"**
3. Enter your location details:
   - **Location Name**: e.g., "Sigiriya Rock Fortress"
   - **Location ID**: Optional, auto-generated if empty
4. Generate **two QR codes**:
   - One for **Check-In** (entrance)
   - One for **Check-Out** (exit)

### Step 2: Download and Print
1. Click **"Download QR Code"** for each
2. Print on weather-resistant material
3. Use at least A4 size for easy scanning
4. Laminate for durability

### Step 3: Display QR Codes
**Check-In QR Code** - Place at:
- Main entrance
- Ticket counter
- Welcome area

**Check-Out QR Code** - Place at:
- Exit gates
- Gift shop exit
- Parking lot exit

### Step 4: Add Instructions
Create a sign with multilingual instructions:

```
🇬🇧 ENGLISH:
For your safety, please scan this QR code
when entering/leaving this location.

🇱🇰 සිංහල:
ඔබේ ආරක්ෂාව සඳහා, මෙම ස්ථානයට
ඇතුළු වන විට/පිටවන විට මෙම QR කේතය ස්කෑන් කරන්න.

🇮🇳 தமிழ்:
உங்கள் பாதுகாப்புக்காக, இந்த இடத்தை
நுழையும்போது/வெளியேறும்போது இந்த QR குறியீட்டை ஸ்கேன் செய்யவும்.
```

---

## 🚔 For Authorities

### Monitor Active Alerts
1. Open Safety Center
2. View **Emergency Alerts** section
3. See real-time alerts for overdue tourists

### Alert Information Includes:
- Tourist name
- Phone number
- Last known location
- Time of alert
- Expected check-out time

### Take Action:
1. **Contact Tourist Police**: Click to initiate contact
2. **Mark Resolved**: Once tourist is located safely
3. **Add Notes**: Document the resolution

---

## 📱 Testing the System

### Test Check-In/Check-Out Flow:

1. **Generate a Test QR Code**
   ```
   Location: Test Location
   Type: Check-In
   ```

2. **Create Test Tourist Data**
   ```
   Name: Test User
   Phone: +94771234567
   Duration: 5 minutes (for quick testing)
   ```

3. **Scan and Check In**
   - Use the generated QR code
   - Complete check-in process

4. **Wait 20 Minutes**
   - Don't check out
   - System should generate an alert

5. **Check Safety Center**
   - View the alert in the Emergency Alerts section
   - Verify all information is correct

---

## 🔧 Troubleshooting

### Camera Not Working?
- **Browser permissions**: Check browser settings
- **HTTPS required**: QR scanner only works on secure connections
- **Try different browser**: Chrome, Firefox, or Safari recommended

### QR Code Not Scanning?
- **Better lighting**: Move to a well-lit area
- **Clean camera**: Wipe your phone's camera lens
- **Distance**: Hold phone 6-12 inches from QR code
- **Steady hands**: Keep phone still while scanning

### Check-Out Failed?
- **Wrong location**: Make sure you're scanning the QR code for the location you checked into
- **Network issue**: Check your internet connection
- **Try again**: Refresh the page and try scanning again

### Not Getting Alerts?
- **Check Firestore rules**: Ensure database rules are deployed
- **Firebase not configured**: Add credentials to .env file
- **Console errors**: Check browser console for errors

---

## 📊 Sample Data for Testing

### Demo Locations:
1. **Sigiriya Rock Fortress** - loc_sigiriya
2. **Galle Fort Historic District** - loc_galle_fort
3. **Ella Rock Hiking Trail** - loc_ella_rock
4. **Temple of the Sacred Tooth Relic** - loc_temple_tooth
5. **Mirissa Beach** - loc_mirissa_beach

### Test Phone Numbers:
- +94771234567
- +94772345678
- +94773456789

---

## 🆘 Emergency Features (Coming Soon)

- **SMS alerts** to emergency contacts
- **GPS tracking** within locations
- **Automatic location detection**
- **Offline check-in** support
- **Multi-language interface**
- **Tourist police integration**

---

## 📞 Support

**Having issues?**
- Check the main documentation: `QR_TRACKING_GUIDE.md`
- Report bugs on GitHub
- Contact support: support@islandconnect.lk

**Emergency?**
- Tourist Police: **1912**
- Emergency Services: **110**

---

## ✅ Best Practices

### For Maximum Safety:

1. **Always check in** when entering a location
2. **Always check out** when leaving
3. **Set realistic durations** (add buffer time)
4. **Keep phone charged**
5. **Update emergency contact** information
6. **Check active check-ins** regularly

### For Location Managers:

1. **Regular QR code maintenance**
2. **Clear signage and instructions**
3. **Staff training** on the system
4. **Monitor visitor statistics**
5. **Quick response** to alerts

---

**Stay Safe, Travel Smart! 🌏🛡️**
