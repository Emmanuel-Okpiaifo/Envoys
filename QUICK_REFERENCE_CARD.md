# 🎯 GOOGLE SHEETS SETUP - AT A GLANCE

```
╔══════════════════════════════════════════════════════════════════════════╗
║           GOOGLE SHEETS FORM INTEGRATION - QUICK REFERENCE               ║
╚══════════════════════════════════════════════════════════════════════════╝

YOUR SPREADSHEET ID:
┌─────────────────────────────────────────────────────────────────────────┐
│ 17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc                            │
└─────────────────────────────────────────────────────────────────────────┘

SETUP TIMELINE:
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 1: Read guide           ← Read APPS_SCRIPT_QUICK_GUIDE.md      3 min
│ STEP 2: Copy code            ← Copy from APPS_SCRIPT_CODE.gs         2 min
│ STEP 3: Paste to Google      ← Tools → Script editor                 2 min
│ STEP 4: Deploy               ← Deploy → New Deployment               5 min
│ STEP 5: Get URL              ← Copy deployment URL                   1 min
│ STEP 6: Update website       ← Paste in js/main.js:113              1 min
│ STEP 7: Create sheet         ← Add "Responses" sheet                 1 min
│ STEP 8: Test form            ← Fill & submit form                    2 min
│                                                       TOTAL: 15 min →
└──────────────────────────────────────────────────────────────────────────┘

WHAT GETS COLLECTED:
┌──────────────────────────────────────────────────────────────────────────┐
│ ✓ Name              (required)
│ ✓ Email             (required)
│ ✓ Phone             (optional)
│ ✓ Testimony         (required)
│ ✓ Share on Social   (checkbox)
│ ✓ Share Publicly    (checkbox)
│ ✓ User ID           (auto)
│ ✓ User Agent        (auto)
│ ✓ Timestamp         (auto)
└──────────────────────────────────────────────────────────────────────────┘

FILES INVOLVED:
┌──────────────────────────────────────────────────────────────────────────┐
│ 📄 APPS_SCRIPT_CODE.gs
│    └─ Copy this entire file
│    └─ Paste to Google Apps Script editor
│    └─ Contains: doPost() function that saves data
│
│ 💻 js/main.js (line 113)
│    └─ Add your webhook URL here
│    └─ Current: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'
│    └─ Will be: 'https://script.google.com/macros/d/.../useless?v=...'
│
│ 📊 Google Sheet
│    └─ Spreadsheet ID: 17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc
│    └─ Add sheet named: Responses
│    └─ Data auto-populates here
└──────────────────────────────────────────────────────────────────────────┘

KEY URLS:
┌──────────────────────────────────────────────────────────────────────────┐
│ Google Sheet:
│ https://docs.google.com/spreadsheets/d/17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc/
│
│ Apps Script Deploy URL (you get this in step 5):
│ https://script.google.com/macros/d/[YOUR_DEPLOYMENT_ID]/useless?v=[VERSION]
│
│ Documentation:
│ • START_HERE.md (← read this first!)
│ • APPS_SCRIPT_QUICK_GUIDE.md
│ • SETUP_CHECKLIST.md
│ • INTEGRATION_FLOW_EXPLAINED.md
└──────────────────────────────────────────────────────────────────────────┘

DATA FLOW:
┌──────────────────────────────────────────────────────────────────────────┐
│
│   User fills form on website
│   ↓
│   Clicks Submit
│   ↓
│   Data sent to Apps Script (via webhook URL)
│   ↓
│   Apps Script validates & saves to Google Sheet
│   ↓
│   Success message shown to user
│   ↓
│   You see data in Google Sheet immediately
│
└──────────────────────────────────────────────────────────────────────────┘

DEPLOYMENT SETTINGS:
┌──────────────────────────────────────────────────────────────────────────┐
│ Type:              Web app
│ Execute as:        Your email/account
│ Who has access:    Anyone   ← IMPORTANT! Must be "Anyone"
│ New version:       On each deployment
│ Latest code runs:  Automatically (no need to redeploy to change code)
└──────────────────────────────────────────────────────────────────────────┘

SHEET STRUCTURE (Auto-created):
┌──────────────────────────────────────────────────────────────────────────┐
│ Sheet Name: Responses
│
│ Column A: Timestamp         (auto-added)
│ Column B: Name              (from form)
│ Column C: Email             (from form)
│ Column D: Phone             (from form)
│ Column E: Testimony         (from form)
│ Column F: Share on Social   (from checkbox)
│ Column G: Share Publicly    (from checkbox)
│ Column H: User ID           (auto-generated)
│ Column I: User Agent        (auto-detected)
│
│ Formatting (auto-applied):
│ • Green header row (bold white text)
│ • Light green new submissions
│ • Auto-sized columns
│ • Data validation ready
└──────────────────────────────────────────────────────────────────────────┘

TESTING CHECKLIST:
┌──────────────────────────────────────────────────────────────────────────┐
│ After deployment:
│ ☐ Apps Script deployed (shows checkmark)
│ ☐ "Responses" sheet exists
│ ☐ Webhook URL added to js/main.js
│ ☐ Form submits on website
│ ☐ "Thank You" message appears
│ ☐ Check Google Sheet
│ ☐ New row with data appears
│ ☐ Headers are green
│ ☐ All columns have data
│ ☐ Timestamp auto-added
└──────────────────────────────────────────────────────────────────────────┘

TROUBLESHOOTING:
┌──────────────────────────────────────────────────────────────────────────┐
│ Issue: No data appears
│ → Check webhook URL is correct in js/main.js
│ → Check sheet name is exactly "Responses"
│ → Check browser console (F12) for errors
│
│ Issue: "Script not found" error
│ → Make sure you deployed (green checkmark next to Deploy)
│
│ Issue: "Permission denied"
│ → Go to Deploy → Edit
│ → Set "Who has access" to "Anyone"
│
│ Issue: Form submits but nothing happens
│ → Check F12 console for errors
│ → Check Apps Script logs (View → Logs)
│ → Verify form field IDs match (fullName, email, phone, testimonyText)
└──────────────────────────────────────────────────────────────────────────┘

SUCCESS INDICATORS:
┌──────────────────────────────────────────────────────────────────────────┐
│ ✅ Form submits without errors
│ ✅ "Thank you" message appears
│ ✅ Data appears in Google Sheet immediately
│ ✅ Headers are green with white bold text
│ ✅ New submissions have light green background
│ ✅ All form fields appear in columns
│ ✅ Timestamp is auto-added
│ ✅ User ID is recorded
│ → YOU'RE DONE! 🎉
└──────────────────────────────────────────────────────────────────────────┘

NEXT STEPS AFTER THIS:
┌──────────────────────────────────────────────────────────────────────────┐
│ 1. ✅ Google Sheets Setup (you are here)
│ 2. ⏳ Firebase Setup (for image uploads)
│    → Follow: FIREBASE_SETUP.md
│    → Get Firebase credentials
│    → Users can then upload images
│ 3. ⏳ Deploy to Netlify (go live)
│    → Connect GitHub repo
│    → Netlify auto-deploys
│ 4. 🎉 Celebrate! Website is live!
└──────────────────────────────────────────────────────────────────────────┘

QUICK COMMANDS:
┌──────────────────────────────────────────────────────────────────────────┐
│ Copy all code:           Ctrl+A then Ctrl+C
│ Paste code:              Ctrl+V
│ Save in Apps Script:     Ctrl+S
│ Test submission:         F12 → Network tab
│ Check logs:              Apps Script → View → Logs
│ Check console errors:    F12 → Console tab
└──────────────────────────────────────────────────────────────────────────┘

```

---

## 🎯 YOU'RE READY!

Everything is prepared. Just follow the steps above and you'll have a working form
that saves to Google Sheets in 15 minutes!

**Next:** Read **APPS_SCRIPT_QUICK_GUIDE.md** to get started!
