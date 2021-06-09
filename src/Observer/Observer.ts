class Observer {
    listeners: any;

    constructor (){
        this.listeners = {};
    }    
    
    emit(EventName: string, data?: any) {
      const event = this.listeners[EventName];   
      if (event) event.forEach((el: any) => el(data));      
    };

    subscribe (EventName: string, listener: any): this {
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