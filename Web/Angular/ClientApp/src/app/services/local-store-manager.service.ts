import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DBkeys } from "../helpers/constants/db-keys.constants";

import { Utilities } from "../helpers/utilities/utilities";

@Injectable({ providedIn: "root" })
/**
 * Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
 */
export class LocalStoreManager {
  private static syncListenerInitialised = false;
  private static readonly DBKEY_SYNC_KEYS = "sync_keys";
  private syncKeys: string[] = [];
  private initEvent = new Subject();

  static readonly DBKEY_USER_DATA = "user_data";
  static readonly DBKEY_RETURN_URL = "return_url";

  private reservedKeys: string[] = [
    "sync_keys",
    "addToSyncKeys",
    "removeFromSyncKeys",
    "getSessionStorage",
    "setSessionStorage",
    "addToSessionStorage",
    "removeFromSessionStorage",
    "clearAllSessionsStorage",
  ];

  initialiseStorageSyncListener() {
    if (LocalStoreManager.syncListenerInitialised === true) {
      return;
    }

    LocalStoreManager.syncListenerInitialised = true;
    window.addEventListener("storage", this.sessionStorageTransferHandler, false);
    this.syncSessionStorage();
  }

  deinitialiseStorageSyncListener() {
    window.removeEventListener("storage", this.sessionStorageTransferHandler, false);
    LocalStoreManager.syncListenerInitialised = false;
  }

  clearAllStorage() {
    this.clearAllSessionsStorage();
    this.clearLocalStorage();
  }

  clearAllSessionsStorage() {
    this.clearInstanceSessionStorage();
    localStorage.removeItem(LocalStoreManager.DBKEY_SYNC_KEYS);
  }

  clearInstanceSessionStorage() {
    sessionStorage.clear();
    this.syncKeys = [];
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  /**
   * Based on whether a user chose to be remembered or not, this will save data to either local or session storage.
   * @param data Data to be stored
   * @param key Key of the data to be stored
   */
  saveData(data: any, key = LocalStoreManager.DBKEY_USER_DATA) {
    if (this.getDataObject<boolean>(DBkeys.REMEMBER_ME)) {
      this.savePermanentData(data, key);
    } else {
      this.saveSyncedSessionData(data, key);
    }
  }

  saveSessionData(data: any, key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSyncKeys(key);
    localStorage.removeItem(key);
    this.sessionStorageSetItem(key, data);
  }

  saveSyncedSessionData(data: any, key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    localStorage.removeItem(key);
    this.addToSessionStorage(data, key);
  }

  savePermanentData(data: any, key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    this.localStorageSetItem(key, data);
  }

  moveDataToSessionStorage(key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data == null) {
      return;
    }

    this.saveSessionData(data, key);
  }

  moveDataToSyncedSessionStorage(key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data == null) {
      return;
    }

    this.saveSyncedSessionData(data, key);
  }

  moveDataToPermanentStorage(key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data == null) {
      return;
    }

    this.savePermanentData(data, key);
  }

  exists(key = LocalStoreManager.DBKEY_USER_DATA) {
    let data = sessionStorage.getItem(key);

    if (data == null) {
      data = localStorage.getItem(key);
    }

    return data != null;
  }

  getData(key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    let data = this.sessionStorageGetItem(key);

    if (data == null) {
      data = this.localStorageGetItem(key);
    }

    return data;
  }

  getDataObject<T>(key = LocalStoreManager.DBKEY_USER_DATA, isDateType = false): T {
    let data = this.getData(key);

    if (data != null) {
      if (isDateType) {
        data = new Date(data);
      }
      return data as T;
    } else {
      return null;
    }
  }

  deleteData(key = LocalStoreManager.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    localStorage.removeItem(key);
  }

  getInitEvent(): Observable<{}> {
    return this.initEvent.asObservable();
  }

  private sessionStorageTransferHandler = (event: StorageEvent) => {
    if (!event.newValue) {
      return;
    }

    if (event.key === "getSessionStorage") {
      if (sessionStorage.length) {
        this.localStorageSetItem("setSessionStorage", sessionStorage);
        localStorage.removeItem("setSessionStorage");
      }
    } else if (event.key === "setSessionStorage") {
      if (!this.syncKeys.length) {
        this.loadSyncKeys();
      }
      const data = JSON.parse(event.newValue);
      // console.info("Set => Key: Transfer setSessionStorage" + ",  data: " + JSON.stringify(data));

      for (const key in data) {
        if (this.syncKeysContains(key)) {
          this.sessionStorageSetItem(key, JSON.parse(data[key]));
        }
      }

      this.onInit();
    } else if (event.key === "addToSessionStorage") {
      const data = JSON.parse(event.newValue);

      // console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));

      this.addToSessionStorageHelper(data.data, data.key);
    } else if (event.key === "removeFromSessionStorage") {
      this.removeFromSessionStorageHelper(event.newValue);
    } else if (event.key === "clearAllSessionsStorage" && sessionStorage.length) {
      this.clearInstanceSessionStorage();
    } else if (event.key === "addToSyncKeys") {
      this.addToSyncKeysHelper(event.newValue);
    } else if (event.key === "removeFromSyncKeys") {
      this.removeFromSyncKeysHelper(event.newValue);
    }
  };

  private syncSessionStorage() {
    localStorage.setItem("getSessionStorage", "_dummy");
    localStorage.removeItem("getSessionStorage");
  }

  private addToSessionStorage(data: any, key: string) {
    this.addToSessionStorageHelper(data, key);
    this.addToSyncKeysBackup(key);

    this.localStorageSetItem("addToSessionStorage", { key, data });
    localStorage.removeItem("addToSessionStorage");
  }

  private addToSessionStorageHelper(data: any, key: string) {
    this.addToSyncKeysHelper(key);
    this.sessionStorageSetItem(key, data);
  }

  private removeFromSessionStorage(keyToRemove: string) {
    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);

    localStorage.setItem("removeFromSessionStorage", keyToRemove);
    localStorage.removeItem("removeFromSessionStorage");
  }

  private removeFromSessionStorageHelper(keyToRemove: string) {
    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }

  private testForInvalidKeys(key: string) {
    if (!key) {
      throw new Error("key cannot be empty");
    }

    if (this.reservedKeys.some(x => x === key)) {
      throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
    }
  }

  private syncKeysContains(key: string) {
    return this.syncKeys.some(x => x === key);
  }

  private loadSyncKeys() {
    if (this.syncKeys.length) {
      return;
    }

    this.syncKeys = this.getSyncKeysFromStorage();
  }

  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    const data = this.localStorageGetItem(LocalStoreManager.DBKEY_SYNC_KEYS);

    if (data == null) {
      return defaultValue;
    } else {
      return data as string[];
    }
  }

  private addToSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    if (!storedSyncKeys.some(x => x === key)) {
      storedSyncKeys.push(key);
      this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  private removeFromSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    const index = storedSyncKeys.indexOf(key);

    if (index > -1) {
      storedSyncKeys.splice(index, 1);
      this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  private addToSyncKeysHelper(key: string) {
    if (!this.syncKeysContains(key)) {
      this.syncKeys.push(key);
    }
  }

  private removeFromSyncKeys(key: string) {
    this.removeFromSyncKeysHelper(key);
    this.removeFromSyncKeysBackup(key);

    localStorage.setItem("removeFromSyncKeys", key);
    localStorage.removeItem("removeFromSyncKeys");
  }

  private removeFromSyncKeysHelper(key: string) {
    const index = this.syncKeys.indexOf(key);

    if (index > -1) {
      this.syncKeys.splice(index, 1);
    }
  }

  private localStorageSetItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private sessionStorageSetItem(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  private localStorageGetItem(key: string) {
    return Utilities.JsonTryParse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string) {
    return Utilities.JsonTryParse(sessionStorage.getItem(key));
  }

  private onInit() {
    setTimeout(() => {
      this.initEvent.next();
      this.initEvent.complete();
    });
  }
}
