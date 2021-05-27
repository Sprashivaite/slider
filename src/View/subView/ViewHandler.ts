/* eslint-disable no-undef */
import ISubscriber from "./ISubscriber";
import IView from "../IView";

class ViewHandler {
  subscriber!: ISubscriber;

  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLDivElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  button1!: HTMLDivElement;

  button2: HTMLDivElement | undefined;

  constructor(View: IView, subscriber: ISubscriber) {
    this.init(View, subscriber);
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      if (this.isHorizontal) this.mouseCoords = event.clientX;
      if (!this.isHorizontal) this.mouseCoords = event.clientY;
    };
    document.addEventListener("mousemove", Coords);
  }

  mouseEventSlider(
    mouseMove = this.notifyMouseMove
  ): void {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;
    const handler = mouseMove.bind(this);

    const useHandler = () => handler();

    if (!this.isRangeSlider) {
      this.field.addEventListener("mousedown", useHandler);
    }
  }

  mouseEventRange(
    mouseMove = this.notifyMouseMove,
    mouseMove2 = this.notifyMouseMove2
  ): void {
    const handler = mouseMove.bind(this);
    const handler2 = mouseMove2.bind(this);

    const useHandlers = () => {
      let buttonOffset =
        this.button1.getBoundingClientRect().left +
        this.button1.offsetWidth / 2;
      let buttonOffset2 =
        this.button2!.getBoundingClientRect().left +
        this.button2!.offsetWidth / 2;
      if (!this.isHorizontal) {
        buttonOffset = this.button1.getBoundingClientRect().top;
        buttonOffset2 = this.button2!.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
        handler2();
      } else {
        handler();
      }
    };

    this.field.addEventListener("mousedown", useHandlers);
  }

  addScaleHandler(): void {
    let useHandler = (event: any) => {
      const value = event.currentTarget.innerHTML;
      this.notifyScaleClick(value);
    };
    if (this.isRangeSlider) {
      useHandler = (event) => {
        let buttonOffset =
          this.button1.getBoundingClientRect().left +
          this.button1.offsetWidth / 2;
        let buttonOffset2 =
          this.button2!.getBoundingClientRect().left +
          this.button2!.offsetWidth / 2;
        if (!this.isHorizontal) {
          buttonOffset = this.button1.getBoundingClientRect().top;
          buttonOffset2 = this.button2!.getBoundingClientRect().top;
        }
        const value = event.currentTarget.innerHTML;

        if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
          this.notifyScaleClick2(value);
        } else {
          this.notifyScaleClick(value);
        }
      };
    }
    const spans = this.field.nextElementSibling!.querySelectorAll("span");
    spans.forEach((element) => {
      element.addEventListener("click", useHandler);
    });
  }

  addButtonHandler1(): void {
    const handler = this.notifyMouseMove.bind(this);

    const useHandler = () => {
      this.notifyMouseDown();
      handler();
      document.addEventListener("mousemove", handler);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", handler);

        this.notifyMouseUp.call(this);
      };
    };

    if (!this.isRangeSlider) {
      this.button1.addEventListener("mousedown", useHandler);
    }
  }

  addButtonHandler2(): void {
    const handler = this.notifyMouseMove.bind(this);
    const handler2 = this.notifyMouseMove2.bind(this);
    const useHandlers = () => {
      let buttonOffset =
        this.button1.getBoundingClientRect().left +
        this.button1.offsetWidth / 2;
      let buttonOffset2 =
        this.button2!.getBoundingClientRect().left +
        this.button2!.offsetWidth / 2;
      if (!this.isHorizontal) {
        buttonOffset = this.button1.getBoundingClientRect().top;
        buttonOffset2 = this.button2!.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
        this.notifyMouseDown2();
        handler2();
        document.addEventListener("mousemove", handler2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler2);
          this.notifyMouseUp2.call(this);
        };
      } else {
        this.notifyMouseDown();
        handler();
        document.addEventListener("mousemove", handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler);
          this.notifyMouseUp.call(this);
        };
      }
    };

    this.button2.addEventListener("mousedown", useHandlers);
    this.button1.addEventListener("mousedown", useHandlers);
  }

  private init(View: IView, subscriber: ISubscriber) {
    this.subscriber = subscriber;
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
    this.slider = View.slider.div;
    this.field = View.field.div;
    this.button1 = View.button1.div;
    if (View.button2) this.button2 = View.button2.div;
  }

  private notifyScaleClick(value: any): void {
    this.subscriber.scaleClick(value);
  }

  private notifyScaleClick2(value: any): void {
    this.subscriber.scaleClick2(value);
  }

  private notifyMouseDown(): void {
    this.subscriber.mouseDownButton();
  }

  private notifyMouseDown2(): void {
    this.subscriber.mouseDownButton2();
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
