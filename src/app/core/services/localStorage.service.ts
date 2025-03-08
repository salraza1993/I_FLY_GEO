import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any|unknown = localStorage;
  constructor() { }

  public clear(): void {
    this.storage.clear();
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public getInnerItem(storageKey: string, key: string): any {
    let jsonValue = this.storage.getItem(storageKey);
    if (jsonValue !== null) {
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue.hasOwnProperty(key)) {
        return jsonValue[key]
      }
    }
    return null;
  }

  public removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  public setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
  public setInnerItem(storageKey: string, key: string, value: any): void {
    let jsonValue = this.storage.getItem(storageKey);
    if (jsonValue !== null) {
      jsonValue = JSON.parse(jsonValue);
      jsonValue[key] = value
    } else {
      jsonValue = { [key]: value }
    }
    this.setItem(storageKey, JSON.stringify(jsonValue));
  }
}
