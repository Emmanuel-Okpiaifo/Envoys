# Google Sheets Setup Guide for Form Submissions

## Your Spreadsheet ID
```
17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc
```

## Step 1: Open Apps Script Editor

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc/
2. Click **Tools** → **Script editor**
3. A new tab will open with the Apps Script editor

## Step 2: Add the Code

1. **Delete** any existing code in the editor
2. **Copy** all the code from `APPS_SCRIPT_CODE.gs` file in your project
3. **Paste** it into the Apps Script editor
4. Press **Ctrl+S** (or Cmd+S) to save

## Step 3: Create a "Responses" Sheet

1. Go back to your Google Sheet
2. At the bottom, click the **"+"** button to add a new sheet
3. Name it **"Responses"** (must match the SHEET_NAME in the script)
4. You can leave it empty - the script will add headers automatically

## Step 4: Deploy as Web App

1. Back in the Apps Script editor, click **"Deploy"** button (top right)
2. Click **"New Deployment"**
3. Click the dropdown and select **"Web app"**
4. Fill in the fields:
   - **Execute as**: Select your email/account
   - **Who has access**: Select **"Anyone"**
5. Click **"Deploy"**
6. Click **"Authorize access"** when prompted
7. Select your Google account
8. Click **"Advanced"** → **"Go to [project name] (unsafe)"**
9. Click **"Allow"**
10. **Copy the Deployment URL** - you'll need this!

Example URL format:
```
https://script.google.com/macros/d/[DEPLOYMENT_ID]/useless?v=[VERSION]
```

## Step 5: Update Your Website Form

Update the `SHEET_WEBHOOK_URL` in your `js/main.js`:

Find this line:
```javascript
const SHEET_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
```

Replace it with your deployment URL from Step 4:
```javascript
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/d/[DEPLOYMENT_ID]/useless?v=[VERSION]';
```

## Step 6: Test the Form

1. Open your website
2. Scroll to the testimony form
3. Fill in and submit
4. Check your Google Sheet - the response should appear!

---

## What Gets Collected

The form will collect:
- ✓ Name
- ✓ Email
- ✓ Phone (optional)
- ✓ Testimony text
- ✓ Share on Social (checkbox)
- ✓ Share Publicly (checkbox)
- ✓ User ID (for tracking)
- ✓ IP Address
- ✓ User Agent
- ✓ Timestamp

## Spreadsheet Features

✓ **Auto-formatted headers** - Green background, bold white text
✓ **Auto-sized columns** - Properly sized for content
✓ **Color-coded rows** - New submissions have light green background
✓ **Timestamps** - Each submission gets a UTC timestamp
✓ **Auto-creates sheet** - If "Responses" sheet doesn't exist, it creates one

## Troubleshooting

### Form submissions not appearing?

1. **Check the deployment URL** - Make sure it's correct in `js/main.js`
2. **Check Apps Script logs** - In Apps Script editor: **View** → **Logs**
3. **Check browser console** - Press F12, look for errors
4. **Test the script** - In Apps Script, click **Run** → Run the `testSubmission()` function
5. **Check sheet name** - Make sure the sheet is named exactly "Responses"

### "Permission Denied" error?

1. Go back to Apps Script
2. Click **Deploy** → Edit deployment (pencil icon)
3. Make sure "Who has access" is set to **"Anyone"**
4. Click **Update**

### Need to update the code?

1. Edit the code in Apps Script editor
2. Press **Ctrl+S** to save
3. The deployment automatically uses the latest code

## Optional: Advanced Features

### Change the Sheet Name
If you want responses to go to a different sheet name:

In `APPS_SCRIPT_CODE.gs`, change line 6:
```javascript
const SHEET_NAME = 'Your-Sheet-Name-Here';
```

### Add More Fields
To collect additional fields from your form:

1. Add the field to your form HTML
2. Add it to the JavaScript payload:
   ```javascript
   payload.newField = document.getElementById('field-id').value;
   ```
3. Add a column to the headers array in `addHeaders()` function

### Filter or Process Data
You can add functions to process data before saving:
```javascript
// Example: Convert testimony to uppercase
payload.testimony = payload.testimony.toUpperCase();

// Or validate email format
if (!isValidEmail(payload.email)) {
  // Reject submission
}
```

---

## Security Notes

- ⚠️ **Anonymous access** - Anyone can currently submit to this URL
- 🔒 **For production** - Consider adding authentication or rate limiting
- 📧 **Privacy** - Be aware you're collecting personal data; follow GDPR/privacy laws
- 🗑️ **Data retention** - Consider archiving old responses periodically

---

## Support

- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Google Sheets API Guide](https://developers.google.com/sheets/api)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Note:** If the form submits but nothing appears in the sheet, ensure:
- The script is deployed as a Web app with "Anyone" access
- Your sheet has the correct headers in row 1
- You authorized the script when prompted
