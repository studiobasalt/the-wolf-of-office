import { writable } from 'svelte/store';
import { auth } from '@stores/firebase';

export const user = writable(null);

// hook after auth is initialized
auth.onAuthStateChanged((userCredential) => {
  user.set(userCredential);
});
