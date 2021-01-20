import ISubscriber from "../ISubscriber"; 
import IView from "../IView";

class ViewHandler {
  subscriber: ISubscriber;
  mouseCoords: number;
  isHorizontal: boolean;
  slider: HTMLDivElement;
  isRangeSlider: boolean;
  field: HTMLDivElement;
  button: HTMLDivElement;
  button_2: HTMLDivElement | undefined;
  constructor(View: IView, subscriber: ISubscriber) {
    this.isHorizontal = View.isHorizontal;
    this.isRangeSlider = View.isRangeSlider;
    this.slider = View.slider.div;
    this.field = View.field.div
    this.button = View.button.div
    if (View.button_2) this.button_2 = View.button_2.div
    this.subscriber = subscriber;
    this.mouseCoords = 0;
  }

  getMouseCoords(): void {
    let that = this;
    function Coords(event: MouseEvent) {
      if (that.isHorizontal) {
        that.mouseCoords = event.clientX;
      }
      if (!that.isHorizontal) {
        that.mouseCoords = event.clientY;
      }
    }
    document.addEventListener("mousemove", Coords);
  }
  mouseEventSlider(
    MouseMove = this.notifyMouseMove,
    MouseUp = this.notifyMouseUp
  ) {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    let Handler = MouseMove.bind(this);

    if (!this.isRangeSlider) {
      this.field.addEventListener("mousedown", () => {
        Handler();
        
        document.addEventListener("mousemove", Handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", Handler);
          MouseUp.call(this);
        };
      });
    }
    
  }
  mouseEventRange(
    MouseMove = this.notifyMouseMove,
    MouseMove_2 = this.notifyMouseMove_2,
    MouseUp = this.notifyMouseUp,
    MouseUp_2 = this.notifyMouseUp_2
  ) {
    let Handler = MouseMove.bind(this);
    let Handler_2 = MouseMove_2.bind(this);

    this.field.addEventListener("mousedown", () => {
      let buttonOffset = this.button.getBoundingClientRect().left;
      let buttonOffset_2 = this.button_2.getBoundingClientRect().left;

      if (!this.isHorizontal) {
        buttonOffset = this.button.getBoundingClientRect().top;
        buttonOffset_2 = this.button_2.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset_2 + buttonOffset) / 2) {
        Handler_2();
        document.addEventListener("mousemove", Handler_2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", Handler_2);
          MouseUp_2.call(this);
        };
      } else {
        Handler();
        document.addEventListener("mousemove", Handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", Handler);
          MouseUp.call(this);
        };
      }
    });
  }
  private notifyMouseMove() {
    this.subscriber.mouseMoveButton(); 
    
  }
  private notifyMouseUp() {
    this.subscriber.mouseUp();
  }
  private notifyMouseMove_2() {
    this.subscriber.mouseMoveButton_2();
  }
  private notifyMouseUp_2() {
    this.subscriber.mouseUp_2();
  }
}
export default ViewHandler;
