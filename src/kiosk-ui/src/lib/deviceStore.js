import { writable, get } from 'svelte/store';

export const currentDeviceId = writable(null);
export const deviceStore = writable([
  {
    name: 'Device 1',
    id: 'device1',
    views: [
      {
        id: 'view1',
        interval: 1000
      },
      {
        id: 'view2',
        interval: 1000
      }
    ]
  },
  {
    name: 'Device 2',
    id: 'device2',
    views: [
      {
        id: 'view1',
        interval: 1000
      }
    ]
  }
]);

export function registerDevice() {
  const name = prompt('Enter device name:');
  const id = name.toLowerCase().replace(' ', '-');

  // check if device already exists
  const devices = get(deviceStore);
  const device = devices.find((device) => device.name === name);
  if (device) {
    alert('Device already exists');
    return;
  }

  deviceStore.update((devices) => {
    return [
      ...devices,
      {
        name,
        id,
        views: []
      }
    ];
  });
  currentDeviceId.set(id);
}

export function removeViewFromDevice(deviceId, viewId) {
  deviceStore.update((devices) => {
    const device = devices.find((device) => device.id === deviceId);
    device.views = device.views.filter((view) => view.id !== viewId);
    return devices;
  });
}

export function removeDevice(deviceId) {
  deviceStore.update((devices) => {
    return devices.filter((device) => device.id !== deviceId);
  });
}

export function setDevice(deviceId) {
  currentDeviceId.set(deviceId);
}
