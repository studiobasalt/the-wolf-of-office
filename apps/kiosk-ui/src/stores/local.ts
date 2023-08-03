import { writable } from 'svelte/store'
import { browser } from '$app/environment'

type DeviceLocalEnv = {
	defaultDevice: string,
	screenOrientation: Orientation,
}

export const deviceEnvs = writable<DeviceLocalEnv | null>(init())

function init(){
	if (!browser) return
	const config : DeviceLocalEnv = {
		defaultDevice: localStorage?.defaultDevice || '',
		screenOrientation: localStorage?.screenOrientation || 'normal',
	}
	return config
}
	
export function updateDefaultDevice(deviceId: string) {
	localStorage?.setItem('defaultDevice', deviceId)
	deviceEnvs.update((config) => {
		return {
			...config,
			defaultDevice: deviceId,
		}
	})
}

export function updateOrientation(orientation: Orientation){
	localStorage?.setItem('screenOrientation', orientation)
	deviceEnvs.update((config) => {
		return {
			...config,
			screenOrientation: orientation,
		}
	})
}