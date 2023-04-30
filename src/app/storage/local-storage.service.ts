import { Injectable, Inject } from '@angular/core';

import { StorageResult } from './storage-result';
import { StorageConfig } from './config.interface';
import { STORAGE_CONFIG_TOKEN } from './constants';

// @dynamic
@Injectable()
export class LocalStorageService {

  private delimiter = ':';

  constructor(@Inject(STORAGE_CONFIG_TOKEN) private config: StorageConfig) { }


  private get prefix() {
    return this.config.localStorage.prefix;
  }

  private get suppressWarnings() {
    return this.config.localStorage.suppressWarnings;
  }

  private buildKey(key: string): string {
    return this.prefix + this.delimiter + key;
  }

  get(key: string): StorageResult {
    const item: string = window.localStorage.getItem(this.buildKey(key)) as string;
    return new StorageResult(item);
  }

  key(index: number): string {
    return window.localStorage.key(index) as string;
  }

  set(key: string, data: any): void {
    const type = typeof data, set = (d: any) => window.localStorage.setItem(this.buildKey(key), d);
    switch (type) {
      case 'string':
        set(data);
        break;
      case 'number':
        set(data.toString());
        break;
      case 'boolean':
        set(data.toString());
        break;
      case 'object':
        if (data instanceof Date) {
          set(data);
        } else {
          set(JSON.stringify(data));
        }
    }
  }

  remove(key: string): void {
    window.localStorage.removeItem(this.buildKey(key));
  }

  has(key: string): boolean {
    return !!window.localStorage.getItem(this.buildKey(key));
  }

  clear(): void {
    if (!this.suppressWarnings) {
      console.warn(`Calling the localStorageService.clear method will delete all
                  the contents of local storage, including the ones not added
                  with this service (not having your custom prefix). Use with caution.
                  To suppress this message use \`suppressWarning\` option in the config option
                  when importing the StorageModule`);
    }
    window.localStorage.clear();
  }

  get length() {
    if (!this.suppressWarnings) {
      console.warn(`Accessing the localStorageService.length will return the length of all
                  the contents of local storage, including the ones not added
                  with this service (not having your custom prefix). Use with caution.
                  To suppress this message use \`suppressWarning\` option in the config option
                  when importing the StorageModule`);
    }
    return window.localStorage.length;
  }
}
