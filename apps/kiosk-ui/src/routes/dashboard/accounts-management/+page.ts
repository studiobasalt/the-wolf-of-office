import type { PageLoad } from './$types';
import { doc, onSnapshot, collection, query, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '@stores/firebase';
import { writable } from 'svelte/store';
import type { UserData } from '@stores/auth';
import { userData } from '@stores/auth';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const load = (async () => {
    const users = writable<UserData[]>([]);
    let lastUsersUpdate: UserData[] = [];

    if (!browser) return {
        users
    };

    // Get all collection items from users collection
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let userArray:UserData[] = [];
        querySnapshot.forEach((doc) => {
            const data:UserData = {
                id: doc.id,
                email: doc.data().email ? doc.data().email : '',
                isUser: doc.data().isUser,
                isAdmin: doc.data().isAdmin ? doc.data().isAdmin : false,
                hasAccess: doc.data().hasAccess ? doc.data().hasAccess : false,
                isSelf: doc.id === get(userData).id
            }
            userArray.push(data);
        });

        // sort in a way that isSelf is always first
        userArray.sort((a, b) => {
            if (a.isSelf) return -1;
            if (b.isSelf) return 1;
            return 0;
        });

        lastUsersUpdate = JSON.parse(JSON.stringify(userArray));
        users.set(userArray);
    });

    // Write changes to firestore
    users.subscribe((users) => {
        if (users.length === 0) return;
        for (const user of users) {
            if (user.isSelf) continue;
            if (JSON.stringify(user) === JSON.stringify(lastUsersUpdate[users.indexOf(user)])) continue;
            try {
                if (!user.id) continue
                const docRef = doc(db, 'users', user.id);
                updateDoc(docRef, {
                    isAdmin: user?.isAdmin ?? false,
                    hasAccess: user?.hasAccess ?? false
                });
            } catch (error: any) {
                alert(error?.message ?? 'An error occured while updating user data');
            }
        }
    });

    return {
        users,
        unsubscribe
    };
}) satisfies PageLoad;