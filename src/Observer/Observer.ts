class Observer {
    listeners: any;

    constructor (){
        this.listeners = {};
    }    
    
    emit(EventName, data?) {
      const event = this.listeners[EventName];   
      if (event) event.forEach(el => el(data));      
    };

    subscribe (EventName, listener) {
      const event = this.listeners[EventName];

      if (event) {
        if (!event.includes(listener)) {
          event.push(listener);
        }
      } else {
        this.listeners[EventName] = [listener];
      }
      return this
    };    

}
export default Observer