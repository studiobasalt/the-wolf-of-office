const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAoaQv657JWPnOCJ3kCVxLJyH_DiOeK3RE',
  authDomain: 'wolf-of-office.firebaseapp.com',
  projectId: 'wolf-of-office',
  storageBucket: 'wolf-of-office.appspot.com',
  messagingSenderId: '894620490761',
  appId: '1:894620490761:web:8a650bf634898111e5ecd8'
};

const app = initializeApp(config);
const db = getFirestore(app);

module.exports = {
  app,
  db
};
