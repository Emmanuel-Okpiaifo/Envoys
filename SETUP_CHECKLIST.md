# ✅ Google Sheets Setup Checklist

Print this out and check off as you complete each step!

## 📋 Pre-Setup
- [ ] Read the APPS_SCRIPT_QUICK_GUIDE.md
- [ ] Have your Spreadsheet ID ready: `17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc`
- [ ] Have Google account logged in

## 1️⃣ Prepare the Code
- [ ] Open `APPS_SCRIPT_CODE.gs` from your project
- [ ] Select ALL the code (Ctrl+A)
- [ ] Copy the code (Ctrl+C)

## 2️⃣ Open Google Apps Script
- [ ] Open your Google Sheet: https://docs.google.com/spreadsheets/d/17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc/
- [ ] Click **Tools** menu at top
- [ ] Click **Script editor** 
- [ ] A new tab opens with Apps Script

## 3️⃣ Add the Code
- [ ] Delete any existing code in the editor
- [ ] Paste your code (Ctrl+V)
- [ ] Look for "Google Apps Script" text at top - you should see the code
- [ ] Press **Ctrl+S** to save

## 4️⃣ Deploy the Script
- [ ] Click **Deploy** button (top right)
- [ ] Click **New Deployment** (if prompted)
- [ ] Click dropdown that says "Select type"
- [ ] Choose **Web app** from the list
- [ ] Under "Execute as": Select your email/account
- [ ] Under "Who has access": Select **Anyone** (important!)
- [ ] Click **Deploy** button

## 5️⃣ Handle Authorization
- [ ] Google may ask "Authorize access"
- [ ] Click **Authorize** 
- [ ] Select your Google account
- [ ] Click **Advanced** (if security warning appears)
- [ ] Click **Go to [project name] (unsafe)**
- [ ] Click **Allow**
- [ ] You should see "Deployment successful"

## 6️⃣ Get the Deployment URL
- [ ] Look for a URL that starts with: `https://script.google.com/macros/d/`
- [ ] **Copy the entire URL** - you'll need this!
- [ ] Paste it somewhere safe (notepad, etc.)

## 7️⃣ Update Your Website
- [ ] Go back to VS Code
- [ ] Open file: `js/main.js`
- [ ] Find line 113: `const SHEET_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`
- [ ] Replace the URL with the one from step 6
- [ ] Should look like: `const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/d/YOUR_ID/useless?v=YOUR_VERSION';`
- [ ] Press **Ctrl+S** to save

## 8️⃣ Create Response Sheet
- [ ] Go back to your Google Sheet tab
- [ ] Look at the bottom of the sheet
- [ ] Click the **+** button (add new sheet)
- [ ] Type **Responses** as the name
- [ ] Press Enter
- [ ] The sheet is created (empty is OK)

## 9️⃣ Test the Setup
- [ ] Open your website in a browser (or localhost)
- [ ] Scroll down to the testimony form
- [ ] Fill in the form fields:
  - [ ] Full Name: (test name)
  - [ ] Email: (test email)
  - [ ] Phone: (optional)
  - [ ] Testimony: (test message)
  - [ ] Checkboxes: (optional, check some)
- [ ] Click **Submit**
- [ ] You should see: "Thank You! 🙏" message

## 🔟 Verify Data in Sheet
- [ ] Go back to your Google Sheet
- [ ] Click on the **Responses** tab
- [ ] You should see:
  - [ ] Green header row with column names
  - [ ] Your test data in the first row
  - [ ] All columns filled with data
- [ ] If data appears: ✅ **SUCCESS!**

## ❌ Troubleshooting Checklist

If it didn't work, check:

### Data doesn't appear in sheet
- [ ] Is the Responses sheet named exactly "Responses"? (case sensitive)
- [ ] Check browser console (F12 → Console tab) for errors
- [ ] Is the webhook URL correct in js/main.js?
- [ ] Try another test submission

### "Script not found" error
- [ ] Go back to Apps Script tab
- [ ] Look for "Manage deployments" near Deploy button
- [ ] Click it - should show your deployment
- [ ] If empty, you didn't deploy successfully

### "Permission denied" error  
- [ ] Go to Apps Script
- [ ] Click **Deploy** → Edit deployment (pencil icon)
- [ ] Change "Who has access" to **Anyone**
- [ ] Click **Update**
- [ ] Try form again

### Form says "Thank you" but no data appears
- [ ] Check browser console (F12)
- [ ] Look for any error messages
- [ ] Verify webhook URL is exactly correct
- [ ] Check Apps Script logs (View → Logs)

---

## ✨ Success Indicators

When everything works:
- ✅ Form submits without errors
- ✅ "Thank You!" modal appears
- ✅ Data appears in Google Sheet immediately
- ✅ Headers are green with white text
- ✅ New rows have light green background
- ✅ All form fields are in the sheet

---

## 📞 You're Done!

Once all checkboxes are complete, your form is set up and ready to go live on Netlify!

**Save this checklist** - you'll need it if you ever need to redeploy or update the code.

---

Last updated: February 20, 2026
Spreadsheet ID: 17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc
