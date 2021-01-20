import ISubscriber from "./ISubscriber";
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
    this.field = View.field.div;
    this.button = View.button.div;
    if (View.button_2) this.button_2 = View.button_2.div;
    this.subscriber = subscriber;
    this.mouseCoords = 0;
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      if (this.isHorizontal) {
        this.mouseCoords = event.clientX;
      }
      if (!this.isHorizontal) {
        this.mouseCoords = event.clientY;
      }
    };
    document.addEventListener("mousemove", Coords);
  }
  mouseEventSlider(
    MouseMove = this.notifyMouseMove,
    MouseUp = this.notifyMouseUp
  ): void {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    const handler = MouseMove.bind(this);

    const useHandler = () => {
      handler();
      document.addEventListener("mousemove", handler);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", handler);
        MouseUp()
      };
    };

    if (!this.isRangeSlider) {
      this.field.addEventListener("mousedown", useHandler);
    }
  }
  mouseEventRange(
    MouseMove = this.notifyMouseMove,
    MouseMove_2 = this.notifyMouseMove_2,
    MouseUp = this.notifyMouseUp,
    MouseUp_2 = this.notifyMouseUp_2
  ): void {
    const handler = MouseMove.bind(this);
    const handler_2 = MouseMove_2.bind(this);

    const useHandlers = () => {
      let buttonOffset = this.button.getBoundingClientRect().left;
      let buttonOffset_2 = this.button_2.getBoundingClientRect().left;

      if (!this.isHorizontal) {
        buttonOffset = this.button.getBoundingClientRect().top;
        buttonOffset_2 = this.button_2.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset_2 + buttonOffset) / 2) {
        handler_2();
        document.addEventListener("mousemove", handler_2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler_2);
          MouseUp_2.call(this);
        };
      } else {
        handler();
        document.addEventListener("mousemove", handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler);
          MouseUp.call(this);
        };
      }
    }

    this.field.addEventListener("mousedown", useHandlers );
  }
  private notifyMouseMove(): void {
    this.subscriber.mouseMoveButton();
  }
  private notifyMouseUp(): void {
    this.subscriber.mouseUp();
  }
  private notifyMouseMove_2(): void {
    this.subscriber.mouseMoveButton_2();
  }
  private notifyMouseUp_2(): void {
    this.subscriber.mouseUp_2();
  }
}
export default ViewHandler;
