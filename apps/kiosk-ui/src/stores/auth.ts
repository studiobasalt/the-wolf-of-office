import { writable } from 'svelte/store';
import { auth, db } from '@stores/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import type { User } from 'firebase/auth';

export type UserData = {
  email?: string;
  isUser: boolean;
  isAdmin?: boolean;
  hasAccess?: boolean;
  isSelf?: boolean;
  id?: string;
}

export const user = writable<User | null>(null);
export const userData = writable<UserData>({ isUser: false });

auth.onAuthStateChanged((userCredential: User | null) => {
  user.set(userCredential);
  if (!userCredential) return;
  const { uid } = userCredential;
  onSnapshot(doc(db, 'users', uid), (doc) => {
    if (!doc.exists) return;  
    const data = doc.data();
    userData.set({ 
      id: uid,
      email: data?.email ? data.email : '',
      isUser: true, 
      isAdmin: data?.isAdmin ? data.isAdmin : false,
      hasAccess: data?.hasAccess ? data.hasAccess : false,
      isSelf: true
    });
  })
});