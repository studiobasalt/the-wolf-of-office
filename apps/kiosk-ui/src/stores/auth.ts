import { writable } from 'svelte/store';
import { auth, db } from '@stores/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import type { User } from 'firebase/auth';

type UserData = {
  isUser: boolean;
  isAdmin?: boolean;
}

export const user = writable<User | null>(null);
export const userData = writable<UserData>({ isUser: false });

auth.onAuthStateChanged((userCredential: User | null) => {
  user.set(userCredential);
  if (!userCredential) return;
  const { uid } = userCredential;
  onSnapshot(doc(db, 'users', uid), (doc) => {
    if (!doc.exists) return;  
    const { isAdmin } = doc.data();
    userData.set({ 
      isUser: true, 
      isAdmin
    });
  })
});