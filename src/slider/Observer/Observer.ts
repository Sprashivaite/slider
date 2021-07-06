import { PointData, EventTypes,  EventName,  EventCallback, UserConfig } from '../types';

type data = PointData |  number[] | undefined | UserConfig;

class Observer {
  events: {[key in EventTypes]?: EventCallback[]};

  constructor() {
    this.events = {};
  }

  emit(eventName: EventName, data?: data): void {
    const event = this.events[eventName];
    if (event) event.forEach((el: (data: data) => void) => el(data));
  }

  subscribe(eventName: EventName, listener: EventCallback): this {
    const event  = this.events[eventName];
    if (event && !event.includes(listener)) event.push(listener);
    else {
      this.events[eventName] = [listener];
    }
    return this
  }
}
export default Observer;
