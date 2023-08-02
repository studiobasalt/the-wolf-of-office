import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAoaQv657JWPnOCJ3kCVxLJyH_DiOeK3RE',
  authDomain: 'wolf-of-office.firebaseapp.com',
  projectId: 'wolf-of-office',
  storageBucket: 'wolf-of-office.appspot.com',
  messagingSenderId: '894620490761',
  appId: '1:894620490761:web:8a650bf634898111e5ecd8'
};

export const app = initializeApp(config, {
  automaticDataCollectionEnabled: false,
  name: 'wolf-of-office',
})
export const db = initializeFirestore(app,{
  localCache: persistentLocalCache(),
})
export const auth = getAuth(app);