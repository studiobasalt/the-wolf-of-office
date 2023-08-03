import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@stores/firebase";

export const globalsStore = writable<Globals>();
let globalStoreBefore: Globals;

export function globalsStoreInit() {
    if (!browser) return;
    
    // get collection doc globals.main
    onSnapshot(doc(db, "globals", "main"), (doc) => {
        const data = doc.data() as Globals;
        globalsStore.set(data);
    })
}

globalsStore.subscribe(async (globalsData) => {
    if (!browser) return;

    const newVersion = globalsData?.version;
    const oldVersion = globalStoreBefore?.version;

    globalStoreBefore = JSON.parse(JSON.stringify(globalsData));

    if (newVersion === oldVersion) return;
    if (!oldVersion || !newVersion) return;

    // reload full page
    location?.reload();
})