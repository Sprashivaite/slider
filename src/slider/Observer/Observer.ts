import { EventTypes, EventName, EventCallback } from '../types';

class Observer<A> {
  events: { [key in EventTypes]?: EventCallback<A, void>[] };

  constructor() {
    this.events = {};
  }

  emit(eventName: EventName, data: A): void {
    const event = this.events[eventName];
    if (event) event.forEach(el => el(data));
  }

  subscribe(eventName: EventName, listener: EventCallback<A, void>): this {
    const event = this.events[eventName];
    if (event && !event.includes(listener)) event.push(listener);
    else {
      this.events[eventName] = [listener];
    }
    return this;
  }
}
export default Observer;
