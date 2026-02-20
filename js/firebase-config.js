// Firebase Configuration
// ⚠️ IMPORTANT: Replace these values with your actual Firebase project credentials
// You can find these in Firebase Console > Project Settings > Your apps

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const storage = firebase.storage();
const database = firebase.database();

// Generate or retrieve user ID for tracking uploads
function getUserId() {
    let userId = localStorage.getItem('envoys-user-id');
    if (!userId) {
        userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('envoys-user-id', userId);
    }
    return userId;
}

// Get user ID on load
const CURRENT_USER_ID = getUserId();

console.log('Firebase initialized. User ID:', CURRENT_USER_ID);
