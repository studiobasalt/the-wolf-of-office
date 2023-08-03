/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
    // interface Locals {}
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
}

type View = {
    id?: string;
    name?: string;
    sections?: ViewSection[];
}

type ViewSection = {
    name?: string;
    url?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zoom?: number;
    refreshInterval?: number;
    index?: number;
}

type Orientation = "left" | "default" | "right"

type Device = {
    id?: string;
    name: string;
    views?: _deviceView[];
}

type _deviceView = {
    id: string;
    timeout?: number;
}