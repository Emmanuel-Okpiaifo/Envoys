# Firebase Setup Guide for Gallery Upload Feature

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "Envoys Anniversary Gallery")
4. Choose your country and accept terms
5. Click **"Create project"**
6. Wait for project setup to complete

## Step 2: Set Up Firebase Realtime Database

1. In Firebase Console, go to **Build → Realtime Database**
2. Click **"Create Database"**
3. Choose location (closest to your users)
4. Select **"Start in test mode"** (for development)
   - **Security Rules**: Copy the code below after creation
5. Click **"Enable"**

### Database Security Rules (Copy these):

```json
{
  "rules": {
    "gallery-uploads": {
      ".read": true,
      ".write": "auth.uid != null || root.child('allowAnonymous').val() === true",
      "$uid": {
        ".validate": "newData.hasChildren(['filename', 'downloadURL', 'timestamp', 'userId', 'fileName', 'fileSize'])",
        "filename": { ".validate": "newData.isString()" },
        "downloadURL": { ".validate": "newData.isString()" },
        "timestamp": { ".validate": "newData.isNumber()" },
        "userId": { ".validate": "newData.isString()" },
        "fileName": { ".validate": "newData.isString()" },
        "fileSize": { ".validate": "newData.isNumber()" }
      }
    }
  }
}
```

## Step 3: Set Up Firebase Storage

1. In Firebase Console, go to **Build → Storage**
2. Click **"Get Started"**
3. Choose location (same as database)
4. Select **"Start in test mode"** (for development)
5. Click **"Done"**

### Storage Security Rules (Replace default rules with this):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery-uploads/{allPaths=**} {
      allow read: if request.auth == null || request.auth.uid != null;
      allow create: if request.auth == null || request.auth.uid != null;
      allow delete: if request.auth == null || request.auth.uid != null;
      allow update: if false;
    }
  }
}
```

## Step 4: Get Your Firebase Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click on **"Your apps"** section
3. Click on **Web** icon (or create a web app if not present)
4. Copy the Firebase config object

Your config will look like this:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 5: Update Firebase Config in Your Code

1. Open `js/firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase credentials from Step 4
3. Save the file

## Step 6: Test the Setup

1. Open your website in a browser
2. Look for the **"Share Your Moment"** button in the gallery section
3. Click it to test the upload modal
4. Try uploading an image
5. Check Firebase Console → Storage to see uploaded images
6. Check Firebase Console → Realtime Database to see metadata

## Troubleshooting

### "Firebase is not defined" error
- Make sure `firebase-config.js` is loaded BEFORE `gallery-upload.js`
- Check that Firebase CDN links are correct in `index.html`

### Upload fails with permission error
- Go to Firebase Console → Storage → Rules
- Make sure test mode rules are applied
- Check that Security Rules allow writes

### Images not appearing
- Check browser console for errors (F12 → Console)
- Verify database has entries under `gallery-uploads`
- Make sure Storage has files under `gallery-uploads/` folder

### Delete button not working
- Check that user's own image appears with delete button
- Verify browser console has no errors
- Make sure database rules allow deletes

## Production Deployment

⚠️ **Before going live on Netlify:**

1. **Update Security Rules** - Current rules are for development only
   - Implement proper authentication (Google Sign-in, Email, etc.)
   - Update database and storage rules to be more restrictive

2. **Add rate limiting** - Prevent spam/abuse

3. **Add image moderation** - Review uploaded images before showing

4. **Backup data** - Set up Firebase backups

For production rules, consider:
```json
{
  "rules": {
    "gallery-uploads": {
      ".read": true,
      ".write": "auth != null",
      "$uid": {
        ".validate": "auth.uid === $uid"
      }
    }
  }
}
```

## Need Help?

- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Storage Guide](https://firebase.google.com/docs/storage/web/start)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database/web/start)
