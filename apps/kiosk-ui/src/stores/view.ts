import { db } from '@stores/firebase'
import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';
import { onSnapshot, query, collection, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

export const viewsStore = writable<View[]>([]);
let viewsBefore: View[] = [];

export function viewStoreInit() {
    if (!browser) return;
    const q = query(collection(db, 'views'));
    onSnapshot(q, (querySnapshot) => {
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

export function createView(name: string) {
    const view: View = {
        name,
    };
    viewsStore.update(d => [...d, view]);
}

export function renameView(id: string, name: string) {
    const view = getView(id);
    view.name = name;
    viewsStore.update(d => [...d.filter(d => d.id !== id), view]);
}

export function deleteView(id: string) {
    deleteDoc(doc(db, 'views', id));
}

export function createSection(id: string, section: ViewSection) {
    const view = getView(id);
    view.sections = view.sections || [];
    view.sections.push(section);
    viewsStore.update(d => [...d.filter(d => d.id !== id), view]);
}

export function updateSection(id: string, index: number, section: ViewSection) {
    const view = getView(id);
    view.sections[index] = section;
    viewsStore.update(d => [...d.filter(d => d.id !== id), view]);
}

export function removeSection(id: string, index: number) {
    const view = getView(id);
    view.sections.splice(index, 1);
    viewsStore.update(d => [...d.filter(d => d.id !== id), view]);
}

export function getView(id: string) {
    return get(viewsStore).find(d => d.id === id);
}

// Update devices afterh changes
viewsStore.subscribe(async (viewsData) => {

    // Handle new and updated devices
    for (const view of viewsData) {
        if (JSON.stringify(view) === JSON.stringify(viewsBefore.find(d => d.id === view.id))) continue;

        if (!view.id) {
            try {
                await setDoc(doc(collection(db, 'views')), view);
            } catch (e) {
                alert(`Error adding view ${view.id}: ${e}`);
            }
            continue;
        }

        try {
            await updateDoc(doc(db, 'views', view.id), view);
        } catch (e) {
            alert(`Error updating view ${view.id}: ${e}`);
        }
    }
});
