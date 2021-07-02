import { pointData, eventTypes,  eventName,  eventCallback, userConfig } from '../types';

type data = pointData |  number[] | undefined | userConfig;

class Observer {
  events: {[key in eventTypes]?: eventCallback[]};

  constructor() {
    this.events = {};
  }

  emit(name: eventName, data?: data): void {
    const event = this.events[name];
    if (event) event.forEach((el: (data: data) => void) => el(data));
  }

  subscribe(name: eventName, listener: eventCallback): this {
    const event  = this.events[name];
    if (event && !event.includes(listener)) event.push(listener);
    else {
      this.events[name] = [listener];
    }
    return this
  }
}
export default Observer;
