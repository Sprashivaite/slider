/* eslint-disable no-undef */
import ISubscriber from "./ISubscriber";
import IView from "../IView";
import Observable from "../../Observable/Observable";

class ViewHandler extends Observable{
  subscriber!: ISubscriber;

  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLDivElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  button1!: HTMLDivElement;

  button2: HTMLDivElement | undefined;

  constructor(View: IView) {
    super()
    this.init(View);
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      if (this.isHorizontal) this.mouseCoords = event.clientX;
      if (!this.isHorizontal) this.mouseCoords = event.clientY;
    };
    
    document.addEventListener("mousemove", Coords);
  }

  addFieldHandler(): void {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;

    const useHandler = () => this.emit("fieldClick");


    if (!this.isRangeSlider) {
      this.field.addEventListener("mousedown", useHandler);      
    }
    if (this.isRangeSlider) {
      const useHandlers = () => {
        let buttonOffset =
          this.button1.div.getBoundingClientRect().left +
          this.button1.div.offsetWidth / 2;
        let buttonOffset2 =
          this.button2.div!.getBoundingClientRect().left +
          this.button2.div!.offsetWidth / 2;
        if (!this.isHorizontal) {
          buttonOffset = this.button1.div.getBoundingClientRect().top;
          buttonOffset2 = this.button2.div!.getBoundingClientRect().top;
        }
  
        if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
          this.emit("fieldClick2")
        } else {
          this.emit("fieldClick")
        }
      };
  
      this.field.addEventListener("mousedown", useHandlers);
    }
  }

  addScaleHandler(): void {
    let useHandler = (event: any) => {
      const value = event.currentTarget.innerHTML;
      this.emit("scaleClick", {value, target: this.button1})
    };
    if (this.isRangeSlider) {
      useHandler = (event) => {
        let buttonOffset =
          this.button1.div.getBoundingClientRect().left +
          this.button1.div.offsetWidth / 2;
        let buttonOffset2 =
          this.button2.div!.getBoundingClientRect().left +
          this.button2.div!.offsetWidth / 2;
        if (!this.isHorizontal) {
          buttonOffset = this.button1.div.getBoundingClientRect().top;
          buttonOffset2 = this.button2.div!.getBoundingClientRect().top;
        }
        const value = event.currentTarget.innerHTML;

        if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
          this.emit("scaleClick", {value, target: this.button2})
        } else {
          this.emit("scaleClick", {value, target: this.button1})
        }
      };
    }
    const spans = this.field.nextElementSibling!.querySelectorAll("span");
    spans.forEach((element) => {
      element.addEventListener("click", useHandler);
    });
  }

  addButtonHandler1(): void {
    const handler = this.emit.bind(this, "mouseMove");
    const useHandler = () => {
      this.emit("mouseDown")
      this.emit("mouseMove")
      document.addEventListener("mousemove", handler);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", handler);
        this.emit("mouseUp")
      };
    };

    if (!this.isRangeSlider) {
      this.button1.div.addEventListener("mousedown", useHandler);
    }
  }

  addButtonHandler2(): void {
    const handler = this.emit.bind(this, "mouseMove");
    const handler2 = this.emit.bind(this, "mouseMove2");
    const useHandlers = () => {
      let buttonOffset =
        this.button1.div.getBoundingClientRect().left +
        this.button1.div.offsetWidth / 2;
      let buttonOffset2 =
        this.button2.div!.getBoundingClientRect().left +
        this.button2.div!.offsetWidth / 2;
      if (!this.isHorizontal) {
        buttonOffset = this.button1.div.getBoundingClientRect().top;
        buttonOffset2 = this.button2.div!.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) {
        this.emit("mouseDown2")
        this.emit("mouseMove2")
        document.addEventListener("mousemove", handler2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler2);
          this.emit("mouseUp2")
        };
      } else {
        this.emit("mouseDown")
        this.emit("mouseMove")
        document.addEventListener("mousemove", handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler);
          this.emit("mouseUp")
        };
      }
    };

    this.button2.div.addEventListener("mousedown", useHandlers);
    this.button1.div.addEventListener("mousedown", useHandlers);
  }

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
    this.slider = View.slider.div;
    this.field = View.field.div;
    this.button1 = View.button1;
    if (View.button2) this.button2 = View.button2;
  }

}
export default ViewHandler;
