import { writable, get } from 'svelte/store';

export const appWindow = writable(false);

export function log(message) {
  let electronAPI = get(appWindow)?.electronAPI;
  if (!electronAPI) return;
  electronAPI.log(JSON.stringify(message));
}
