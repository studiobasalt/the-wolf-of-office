import { writable, get } from 'svelte/store';
import { appWindow } from './stores';

export const userIsLoggedIn = writable(false);

// Init states
appWindow.subscribe((window) => {
  if (!window) return;
  addEvents();
});

function addEvents() {
  let electronAPI = get(appWindow)?.electronAPI;
  if (!electronAPI) return;

  electronAPI.onUserLoginStatus((event, status) => {
    userIsLoggedIn.set(status ? true : false);
  });

  electronAPI.initAuth();
}
