export class StorageResult {
  constructor(private rawValue: string) {}

  private generateTypeError(type: string): TypeError {
    return new TypeError(`The result from localStorage cannot be decoded to ${type}`);
  }

  toJSON(): any {
    return JSON.parse(this.rawValue);
  }

  toString(): string {
    return this.rawValue;
  }

  toNumber(): number {
    const result = +this.rawValue;
    if (result !== result) {
      throw this.generateTypeError('Number');
    }
    return result;
  }

  toBoolean(): boolean {
    if (this.rawValue === 'true') {
      return true;
    }
    if (this.rawValue === 'false') {
      return false;
    }
    return !!this.rawValue;
  }

  toInstanceOf<M, T extends M>(type: new(src: M) => T): T {
    return new type(this.toJSON());
  }

  toDate(): Date {
    const date = new Date(this.rawValue);
    if (date.getTime() !== date.getTime()) {
      throw this.generateTypeError('Date');
    }
    return date;
  }

  toArray<T>(): T[] {
    const arr = this.toJSON();
    if (Array.isArray(arr)) {
      return arr as T[];
    }
    throw this.generateTypeError('Array');
  }
}
