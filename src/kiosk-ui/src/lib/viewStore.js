import { writable } from 'svelte/store';

export const viewStore = writable([
  {
    name: 'View 1',
    id: 'view1',
    sections: [
      {
        name: 'Section 1',
        id: 'section1',
        url: 'https://www.google.com',
        xPosition: 0,
        yPosition: 0,
        width: 50,
        height: 50,
        zoom: 1,
        refreshInterval: null
      },
      {
        name: 'Section 2',
        id: 'section3',
        url: 'https://www.microsoft.com',
        xPosition: 50,
        yPosition: 0,
        width: 50,
        height: 50,
        zoom: 1,
        refreshInterval: null
      }
    ]
  },
  {
    name: 'View 2',
    id: 'view2',
    sections: [
      {
        name: 'Section 1',
        id: 'section1',
        url: 'https://www.yesh.com',
        xPosition: 0,
        yPosition: 0,
        width: 50,
        height: 50,
        zoom: 1,
        refreshInterval: null
      },
      {
        name: 'Section 2',
        id: 'section3',
        url: 'https://www.microsoft.com',
        xPosition: 50,
        yPosition: 0,
        width: 50,
        height: 50,
        zoom: 1,
        refreshInterval: null
      }
    ]
  }
]);

export const deleteSection = (viewId, sectionId) => {
  viewStore.update((views) => {
    const view = views.find((view) => view.id === viewId);
    view.sections = view.sections.filter((section) => section.id !== sectionId);
    return views;
  });
};

export const deleteView = (viewId) => {
  viewStore.update((views) => {
    return views.filter((view) => view.id !== viewId);
  });
};

export const editName = (viewId, name) => {
  viewStore.update((views) => {
    const view = views.find((view) => view.id === viewId);
    view.name = name;
    return views;
  });
};

export const createView = (name) => {
  viewStore.update((views) => {
    const id = name.toLowerCase().replace(' ', '-');
    return [
      ...views,
      {
        name,
        id,
        sections: []
      }
    ];
  });
};
