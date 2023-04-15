import { writable } from 'svelte/store';

export const popupStore = writable({
  show: false,
  view: null,
  section: null
});
