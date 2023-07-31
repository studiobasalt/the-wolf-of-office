import { db } from '@stores/firebase'
import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';
import { onSnapshot, query, collection, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

export const viewsStore = writable<View[]>([]);
let viewsBefore: View[] = [];

let _unsubscribe
export function unsubscribeViews() {
    _unsubscribe?.();
}

export function subscribeViews() {
    if (!browser) return;
    const q = query(collection(db, 'views'));
    _unsubscribe = onSnapshot(q, (querySnapshot) => {
        const viewsData: View[] = [];
        querySnapshot.forEach((doc) => {
            try {
                let data = doc.data() as View;
                data.id = doc.id;
                viewsData.push(data);
            } catch (e) {
                alert(`Error parsing view data ${doc.id}: ${e}`);
            }
        });
        viewsBefore = JSON.parse(JSON.stringify(viewsData));
        viewsStore.set(viewsData);
    });
}

export function getView(id: string) {
    return get(viewsStore).find(d => d.id === id);
}

// Update devices afterh changes
viewsStore.subscribe((viewsData) => {

    // Handle new and updated devices
    for (const view of viewsData) {
        if (JSON.stringify(view) === JSON.stringify(viewsBefore.find(d => d.id === view.id))) continue;

        if (!view.id) {
            try {
                setDoc(doc(collection(db, 'views')), view);
            } catch (e) {
                alert(`Error adding view ${view.id}: ${e}`);
            }
            continue;
        }

        try {
            updateDoc(doc(db, 'views', view.id), view);
        } catch (e) {
            alert(`Error updating view ${view.id}: ${e}`);
        }
    }
});
