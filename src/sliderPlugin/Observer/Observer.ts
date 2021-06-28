import { pointData } from '../types';

class Observer {
  listeners: any;

  constructor() {
    this.listeners = {};
  }

  emit(
    eventName: string,
    data?: pointData |  number | pointData | number[]
  ): void {
    const event = this.listeners[eventName];
    if (event) event.forEach((el: any) => el(data));
  }

  subscribe(eventName: string, ...listener: any): this {
    const event = this.listeners[eventName];
    if (event && !event.includes(listener)) event.push(...listener);
    else this.listeners[eventName] = listener;
    return this;
  }
}
export default Observer;
