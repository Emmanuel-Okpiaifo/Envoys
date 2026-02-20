# Apps Script - Quick Deploy Guide

## 📋 What to Do

### 1️⃣ Copy the Code
- Open file: `APPS_SCRIPT_CODE.gs` in your project folder
- Copy ALL the code inside

### 2️⃣ Open Google Sheet
- Go to: https://docs.google.com/spreadsheets/d/17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc/
- Click: **Tools** → **Script editor**

### 3️⃣ Paste & Deploy
- Delete any existing code in the editor
- Paste the code from step 1
- Press: **Ctrl+S** (save)
- Click: **Deploy** → **New Deployment**
- Select: **Web app** from dropdown
- Set: Execute as = Your email
- Set: Who has access = **Anyone** (important!)
- Click: **Deploy**
- Authorize when prompted
- **Copy the URL** it gives you

### 4️⃣ Add URL to Website
- Open: `js/main.js` in your project
- Find this line:
  ```
  const SHEET_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
  ```
- Replace with your URL from step 3
- Save the file

### 5️⃣ Create Response Sheet
- Go back to Google Sheet
- Click **+** button at bottom
- Name it: **Responses** (exactly this)
- Done!

### 6️⃣ Test It!
- Visit your website
- Fill out the testimony form
- Submit
- Check Google Sheet - response should appear!

---

## 🔑 Key Points

| Item | Value |
|------|-------|
| Spreadsheet ID | `17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc` |
| Sheet Name | `Responses` (must be exact) |
| Deploy Type | Web app |
| Who has access | Anyone |
| Form collects | Name, Email, Phone, Testimony, Checkboxes |

---

## 🐛 If It Doesn't Work

**Problem:** "Script not found" error
- ✅ Make sure you deployed it (Deploy button should show "Manage deployments")

**Problem:** Form submits but no data appears
- ✅ Check `js/main.js` has correct URL
- ✅ Check Google Sheet has "Responses" sheet (exact name)
- ✅ Press F12, check browser console for errors

**Problem:** "Permission denied" error
- ✅ Go to Apps Script → Deploy → Edit deployment
- ✅ Change "Who has access" to "Anyone"
- ✅ Click Update

**Problem:** Need to change the code
- ✅ Edit in Apps Script editor
- ✅ Press Ctrl+S (it auto-updates deployment)

---

## 📊 Data Collected

When someone submits the form, this gets saved to your sheet:
- Timestamp (when submitted)
- Name
- Email  
- Phone number
- Testimony text
- Share on Social? (Yes/No)
- Share Publicly? (Yes/No)
- User ID (tracking)
- IP Address
- User Agent

All with nice green headers and automatic formatting!

---

Need help? See the full guide: **GOOGLE_SHEETS_SETUP.md**
