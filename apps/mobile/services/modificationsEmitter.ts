export enum MODIFICATIONS_EVENTS {
  REFRESH = "modifications:refresh",
  CHANGED = "modifications:changed",
}

class ModificationsEmitter {
  private events: { [key: string]: Array<(data?: any) => void> } = {};

  subscribe(event: string, callback: (data?: any) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event: string, callback: (data?: any) => void) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  publish(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  }
}

export const modificationsEmitter = new ModificationsEmitter();
