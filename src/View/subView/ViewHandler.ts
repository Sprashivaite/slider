/* eslint-disable no-undef */
import ISubscriber from "./ISubscriber";
import IView from "../IView";

class ViewHandler {
  subscriber: ISubscriber;

  mouseCoords: number;

  isHorizontal: boolean;

  slider: HTMLDivElement;

  isRangeSlider: boolean;

  field: HTMLDivElement;

  button1: HTMLDivElement;

  button2: HTMLDivElement | undefined;

  constructor(View: IView, subscriber: ISubscriber) {
    this.isHorizontal = View.isHorizontal;
    this.isRangeSlider = View.isRangeSlider;
    this.slider = View.slider.div;
    this.field = View.field.div;
    this.button1 = View.button1.div;
    if (View.button2) this.button2 = View.button2.div;
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
    mouseMove = this.notifyMouseMove,
    mouseUp = this.notifyMouseUp
  ): void {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;
    const handler = mouseMove.bind(this);

    const useHandler = () => {
      handler();
      document.addEventListener("mousemove", handler);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", handler);
        mouseUp.call(this)
      };
    };

    if (!this.isRangeSlider) {
      this.field.addEventListener("mousedown", useHandler);
    }
  }

  mouseEventRange(
    mouseMove = this.notifyMouseMove,
    mouseMove2 = this.notifyMouseMove2,
    mouseUp = this.notifyMouseUp,
    mouseUp2 = this.notifyMouseUp2
  ): void {
    const handler = mouseMove.bind(this);
    const handler2 = mouseMove2.bind(this);

    const useHandlers = () => {
      let buttonOffset = this.button1.getBoundingClientRect().left + this.button1.offsetWidth / 2;
      let buttonOffset2 = this.button2!.getBoundingClientRect().left + this.button2!.offsetWidth / 2;
      if (!this.isHorizontal) {
        buttonOffset = this.button1.getBoundingClientRect().top;
        buttonOffset2 = this.button2!.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
        handler2();
        document.addEventListener("mousemove", handler2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler2);
          mouseUp2.call(this);
        };
      } else {
        handler();
        document.addEventListener("mousemove", handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler);
          mouseUp.call(this);
        };
      }
    }

    this.field.addEventListener("mousedown", useHandlers);

  }

  addScaleHandler(): void {
    let useHandler = () => {
      this.notifyMouseMove()
      this.notifyMouseUp()
    };
    if (this.isRangeSlider) {
      useHandler = () => {
        let buttonOffset = this.button1.getBoundingClientRect().left + this.button1.offsetWidth / 2;
        let buttonOffset2 = this.button2!.getBoundingClientRect().left + this.button2!.offsetWidth / 2;
        if (!this.isHorizontal) {
          buttonOffset = this.button1.getBoundingClientRect().top;
          buttonOffset2 = this.button2!.getBoundingClientRect().top;
        }
        if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
          this.notifyMouseMove2()
          this.notifyMouseUp2()
        } else {
          this.notifyMouseMove()
          this.notifyMouseUp()
        }
      }
    }
    const spans = this.field.nextElementSibling!.querySelectorAll('span')
    spans.forEach(element => {
      element.addEventListener("click", useHandler);
    });
  }

  private notifyMouseMove(): void {
    this.subscriber.mouseMoveButton();
  }

  private notifyMouseUp(): void {
    this.subscriber.mouseUp();
  }

  private notifyMouseMove2(): void {
    this.subscriber.mouseMoveButton2();
  }

  private notifyMouseUp2(): void {
    this.subscriber.mouseUp2();
  }
}
export default ViewHandler;
