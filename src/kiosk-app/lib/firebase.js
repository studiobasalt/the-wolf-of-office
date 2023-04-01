const firebase = require('firebase/app');
require('firebase/auth');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAoaQv657JWPnOCJ3kCVxLJyH_DiOeK3RE",
    authDomain: "wolf-of-office.firebaseapp.com",
    projectId: "wolf-of-office",
    storageBucket: "wolf-of-office.appspot.com",
    messagingSenderId: "894620490761",
    appId: "1:894620490761:web:8a650bf634898111e5ecd8"
});

// Store login token in local storage
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        localStorage.setItem('token', user.refreshToken);
    }
});

// Log back in if token is present
const token = localStorage.getItem('token');
if (token) {
    firebase.auth().signInWithCustomToken(token);
}

function userIsLoggedIn() {
    return firebase.auth().currentUser !== null;
}

// exports
module.exports = {
    userIsLoggedIn
};