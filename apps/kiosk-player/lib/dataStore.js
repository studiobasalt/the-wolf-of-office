const {db} = require('./firebase.js');
const { doc, onSnapshot } = require('firebase/firestore');
const deviceId = process.env.KIOSK_DEVICE_ID;

class DataStore {
    constructor() {
      this.device
      this.views = []
      this.viewSubscribers = [];
      this.subscribers = [];
      this.isInit = true
      if (!deviceId) throw new Error('env KIOSK_DEVICE_ID not set');
      this.init();
    }

    async init(){
      const dataInit = new Promise((resolve, reject) => {
        onSnapshot(doc(db, 'devices', deviceId), async (doc) => {
          this.device = doc.data();
          await this.updateViews();
          resolve();
          if (this.isInit) return 
          this.notifySubscribers();
        });
      })
      await dataInit;
      this.isInit = false
      this.notifySubscribers();
    }

    async updateViews(){
      // Add every new view on device
      for (let view of this.device.views) {
        if (this.views[view.id]) return
        await this.addView(view.id);
      }

      // Remove every view that is not on device
      this.views.forEach((view) => {
        if (this.device.views.find((v) => v.id === view.id)) return
        this.removeView(view.id);
      })
    }

    async addView(viewId){
      const subscription = new Promise((resolve, reject) => {
        const _subscription = onSnapshot(doc(db, 'views', viewId), (doc) => {
          this.views[viewId] = doc.data();
          resolve(_subscription);
          if (this.isInit) return
          this.notifySubscribers();
        })
      })

      this.viewSubscribers[viewId] = await subscription;
    }

    removeView(viewId){
      this.viewSubscribers[viewId]();
      delete this.viewSubscribers[viewId];
      delete this.views[viewId];
    }
  
    get() {
      // join views to device.views and return
      return {
        ...this.device,
        views: this.device.views.map((view) => {
          return {
            ...view,
            ...this.views[view.id]
          }
        }
      )}
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
    }
  
    notifySubscribers() {
      this.subscribers.forEach(callback => callback(this.get()));
    }
  }
  
  module.exports = new DataStore();