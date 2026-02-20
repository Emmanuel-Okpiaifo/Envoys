# Google Sheets Integration - Complete Setup

## 📝 Files Created

1. **APPS_SCRIPT_CODE.gs** - The Apps Script code (copy this into Google Apps Script editor)
2. **GOOGLE_SHEETS_SETUP.md** - Detailed setup instructions
3. **APPS_SCRIPT_QUICK_GUIDE.md** - Quick reference guide

## 🎯 Your Spreadsheet Details

| Property | Value |
|----------|-------|
| **Spreadsheet ID** | `17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc` |
| **Sheet Name** | `Responses` |
| **Form Type** | Testimony Submissions |
| **Auto-formatted** | ✓ Headers, colors, column widths |

## ✅ What's Been Updated

### In `js/main.js`
The form submission function now sends:
- `name` - From "Full Name" field
- `email` - From "Email" field
- `phone` - From "Phone" field (optional)
- `testimony` - From "Testimony" text area
- `shareOnSocial` - Checkbox value
- `sharePublicly` - Checkbox value
- `userId` - User tracking ID
- `userAgent` - Browser info
- `timestamp` - When submitted

### In Apps Script
The `doPost()` function:
- ✓ Receives JSON data from your form
- ✓ Validates required fields
- ✓ Creates "Responses" sheet if missing
- ✓ Auto-formats headers (green background, bold)
- ✓ Auto-sizes columns
- ✓ Adds timestamps
- ✓ Color-codes new submissions (light green)
- ✓ Returns success/error responses

## 🚀 Setup Steps (Follow in Order)

### Step 1: Copy Apps Script Code
```
File: APPS_SCRIPT_CODE.gs → Copy all code inside
```

### Step 2: Open Google Sheet & Apps Script Editor
```
URL: https://docs.google.com/spreadsheets/d/17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc/
Click: Tools → Script editor
```

### Step 3: Paste & Save
```
Paste the code from Step 1
Press: Ctrl+S (save)
```

### Step 4: Deploy as Web App
```
Click: Deploy → New Deployment
Type: Web app
Execute as: Your email/account
Who has access: Anyone (IMPORTANT!)
Click: Deploy
Copy the URL shown
```

### Step 5: Update Website Code
```
File: js/main.js (line 113)
Find: const SHEET_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
Replace with: const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/d/...';
```

### Step 6: Create Response Sheet
```
In Google Sheet:
Click: + (bottom left)
Name: Responses (exact)
Done!
```

### Step 7: Test
```
Visit your website
Fill form → Submit
Check Google Sheet → Data should appear!
```

## 📊 What the Sheet Will Look Like

| Timestamp | Name | Email | Phone | Testimony | Share on Social | Share Publicly | User ID | IP Address | User Agent |
|-----------|------|-------|-------|-----------|-----------------|-----------------|---------|-----------|------------|
| 2/20/2026 10:30:45 | John Doe | john@example.com | +1234567890 | My testimony text... | Yes | No | user-123... | (detected) | Mozilla/5... |

- **Green header row** with white bold text
- **Light green background** on new submissions
- **Auto-sized columns** for easy reading
- **All fields auto-populated** from form

## 🔧 Configuration

### Form Fields Required
Your HTML must have these IDs:
- `fullName` - Text input
- `email` - Email input
- `phone` - Text input
- `testimonyText` - Textarea
- `shareOnSocial` - Checkbox (optional)
- `sharePublicly` - Checkbox (optional)
- `testimony-form` - Form element

### Apps Script Sheet Name
Currently: `Responses`
To change: Edit line 6 in APPS_SCRIPT_CODE.gs

```javascript
const SHEET_NAME = 'Responses'; // Change here
```

## 🔐 Security Notes

**Current Setup:**
- ✓ Anyone can submit (no authentication required)
- ✓ Good for public forms
- ✓ Prevents abuse with form validation

**For Production:**
Consider adding:
- Rate limiting (prevent spam)
- Email verification
- CAPTCHA
- Data encryption
- IP blocking

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Form submits but no data appears | Check webhook URL in js/main.js is correct |
| "Script not found" error | Make sure you deployed the script (Deploy button shows green) |
| Permission denied | Go to Apps Script → Deploy → Edit → Set "Who has access" to Anyone |
| Sheet not created | Create "Responses" sheet manually in Google Sheet |
| Wrong data format | Check form field IDs match: fullName, email, phone, testimonyText |

## 📞 Next Steps

1. ✅ Copy APPS_SCRIPT_CODE.gs
2. ✅ Deploy to Google Apps Script
3. ✅ Get deployment URL
4. ✅ Update js/main.js with URL
5. ✅ Create "Responses" sheet
6. ✅ Test the form
7. ✅ Go live on Netlify!

## 📚 Resources

- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Deployment Guide](https://developers.google.com/apps-script/concepts/deployments)

---

**Status:** Ready to deploy! Follow the 7 setup steps above.
