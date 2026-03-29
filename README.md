# GroundOps — Landscape Operations Hub

## Deploy to Vercel (Step-by-Step) 

### What you need
- A free Vercel account → https://vercel.com/signup
- This folder (groundops)

---

### Step 1 — Sign up for Vercel
Go to https://vercel.com/signup and create a free account.
Sign up with your email or Google account.

### Step 2 — Deploy
1. Go to https://vercel.com/new
2. Click **"Browse"** or drag the entire `groundops` folder onto the page
3. Vercel will detect it as a React app automatically
4. Click **Deploy**
5. Wait ~2 minutes for it to build

### Step 3 — Get your URL
Vercel will give you a URL like:
  https://groundops.vercel.app

You can rename it to anything you like in Vercel settings.

---

### Step 4 — Add to iPhone / iPad Home Screen
Share this URL with your team. On each device:
1. Open the URL in **Safari**
2. Tap the **Share button** (box with arrow)
3. Tap **"Add to Home Screen"**
4. Tap **Add**

The app will appear on the home screen and open full-screen like a native app.

---

## Current Placeholder Data (replace before going live)

### Truck PINs
Each truck has a placeholder PIN. To change them, open `src/App.jsx`
and find the TRUCKS section near the top. PINs are set here:

  pin: String(1000 + (i + 1) * 11).slice(0, 4)

Replace with your own 4-digit PINs for each truck.

### Manager Password
Currently set to: ground25
To change it, find `const MGR_PASS = "ground25"` in src/App.jsx

### Google Form Links
Each form has an "Open →" button. To link them to your real Google Forms,
find the form-item onClick handlers in src/App.jsx and add:
  window.open("YOUR_GOOGLE_FORM_URL", "_blank")

### Jobs Data
Jobs per truck are currently sample data in the TRUCK_JOBS object.
These will be replaced by live Google Sheets data in the next build phase.

---

## Next Phase — Google Sheets Integration
When ready, you'll need:
1. A Google Cloud project (free) with Sheets API enabled
2. A read-only API key
3. The Spreadsheet ID from each of your Google Sheets URLs

This will make jobs, form submissions, and activity feed pull live data.
