class Observer {
  subscribers: any[];
  constructor() {
    this.subscribers = [];
  }
  register(sub) {
    this.subscribers.push(sub);
  }
  notify(){
      this.subscribers.forEach(el => el.mouseMove())
  }
}
export default Observer;
