import { db } from '@stores/firebase'
import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { onSnapshot, query, collection, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

export const deviceStore = writable<Device[]>([]);
let devicesBefore: Device[] = [];

export function deviceStoreInit() {  
    if (!browser) return;
    const q = query(collection(db, 'devices'));
    onSnapshot(q, (querySnapshot) => {
        const devicesData: Device[] = [];
        querySnapshot.forEach((doc) => {           
            try {
                let data = doc.data() as Device;
                data.id = doc.id;
                devicesData.push(data);
            } catch (e) {
                alert(`Error parsing device data ${doc.id}: ${e}`);
            }
        });
        devicesBefore = JSON.parse(JSON.stringify(devicesData));
        deviceStore.set(devicesData);
    });
}

export function addDevice(device: Device) {
    deviceStore.update(devices => {
        devices.push(device);
        return devices;
    });
}

export function removeDevice(id: string | undefined) {
    if (!id) return;
    try {
        deleteDoc(doc(db, 'devices', id));
    } catch (e) {
        alert(`Error deleting device ${id}: ${e}`);
    }
}

export function updateDevice(device: Device) {
    deviceStore.update(devices => {
        const index = devices.findIndex(d => d.id === device.id);
        if (index > -1) devices[index] = device;
        return devices;
    });
}

// Update devices afterh changes
deviceStore.subscribe(async (devicesData) => {

    // Handle new and updated devices
    for (const device of devicesData) {
        if (JSON.stringify(device) === JSON.stringify(devicesBefore.find(d => d.id === device.id))) continue;

        if (!device.id) {
            try {
                await setDoc(doc(collection(db, 'devices')), device);
            } catch (e) {
                alert(`Error adding device ${device.id}: ${e}`);
            }
            continue;
        }

        try {
            await updateDoc(doc(db, 'devices', device.id), device);
        } catch (e) {
            alert(`Error updating device ${device.id}: ${e}`);
        }
    }
});
