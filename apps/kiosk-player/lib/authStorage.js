const Store = require('electron-store');
const store = new Store();

class ElectronPersistence {
  static type = 'NONE';
  type = 'NONE';
  storage = this._getStorage();

  _getPersistence() {
    return JSON.parse(store.get('firebase-auth-storage') ?? null);
  }

  _setPersistence(storage) {
    store.set('firebase-auth-storage', JSON.stringify(storage));
  }

  _getStorage() {
    const storage = this._getPersistence();
    return storage === null ? {} : storage;
  }

  _setStorage() {
    this._setPersistence(this.storage);
  }

  _set(key, value) {
    this.storage[key] = value;
    this._setStorage(this.storage);
  }

  _get(key) {
    const value = this.storage[key];
    return value === undefined ? null : value;
  }

  _remove(key) {
    delete this.storage[key];
    this._setStorage(this.storage);
  }

  _isAvailable() {
    return true;
  }

  _addListener() {
    // Listeners are not supported
    return;
  }

  _removeListener() {
    // Listeners are not supported
    return;
  }
}

module.exports = ElectronPersistence;
