import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const defaultDeviceStore = writable<string>(init())

function init(){
	if (!browser) return ''
	return localStorage?.defaultDevice || ''
}
	
export function updateDefaultDevice(deviceId: string) {
	if (!browser) return
	localStorage?.setItem('defaultDevice', deviceId)
	defaultDeviceStore.set(deviceId)
}

function _runningAsApp() {
	if (!browser) return false
	const userAgent = window.navigator.userAgent.toLowerCase()
	return userAgent.includes('electron') || userAgent.includes('nwjs')
}
export const runningAsApp = _runningAsApp()