import { writable, get } from 'svelte/store';
import { appWindow } from './stores';

export const userIsLoggedIn = writable(true);
export const authErrors = writable();

// Init states
appWindow.subscribe((window) => {
  if (!window) return;
  addEvents();
});

function addEvents() {
  let electronAPI = get(appWindow)?.electronAPI;
  if (!electronAPI) return;

  electronAPI.onUserLoginStatusChange((event, status) => {
    userIsLoggedIn.set(status ? true : false);
  });

  electronAPI.onAuthError((event, error) => {
    if (typeof error !== 'string') return;
    authErrors.set(error);
  });

  electronAPI.initAuth();
}

export function registerUser(email, password) {
  get(appWindow)?.electronAPI?.regsiterUser(email, password);
}

export function loginUser(email, password) {
  get(appWindow)?.electronAPI?.loginUser(email, password);
}

export function logoutUser() {
  get(appWindow)?.electronAPI?.logoutUser();
}
