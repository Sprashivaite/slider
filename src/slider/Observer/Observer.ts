import { PointData, EventTypes, EventName, EventCallback, UserConfig } from '../types';

type Data = PointData | number[] | undefined | UserConfig;

class Observer {
  events: { [key in EventTypes]?: EventCallback[] };

  constructor() {
    this.events = {};
  }

  emit(eventName: EventName, data?: Data): void {
    const event = this.events[eventName];
    if (event) event.forEach((el: (data: Data) => void) => el(data));
  }

  subscribe(eventName: EventName, listener: EventCallback): this {
    const event = this.events[eventName];
    if (event && !event.includes(listener)) event.push(listener);
    else {
      this.events[eventName] = [listener];
    }
    return this;
  }
}
export default Observer;
