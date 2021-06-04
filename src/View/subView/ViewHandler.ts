/* eslint-disable no-undef */
import ISubscriber from "./ISubscriber";
import IView from "../IView";
import Observer from "../../Observer/Observer";

class ViewHandler extends Observer {
  subscriber!: ISubscriber;

  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLDivElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  button1: any;

  button2: any;
  buttonOffset1: any;
  buttonOffset2: any;
  

  constructor(View: IView) {
    super();
    this.init(View);
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      if (this.isHorizontal) this.mouseCoords = event.clientX - this.field.getBoundingClientRect().left;
      if (!this.isHorizontal) this.mouseCoords = event.clientY - this.field.getBoundingClientRect().top;
    };
    document.addEventListener("mousemove", Coords);
  }

  addButtonHandler(): void {
    const emitMouseMove = () => this.emit("mouseMove", this.getFirstButtonData());
    const emitMouseMove2 = () => this.emit("mouseMove2", this.getSecondButtonData());

    const useHandlers = () => {
      if (this.findNearestButton() === "button2") {
        this.emit("mouseDown2", this.getSecondButtonData());
        emitMouseMove2()
        document.addEventListener("mousemove", emitMouseMove2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", emitMouseMove2);
          this.emit("mouseUp2", this.getSecondButtonData());
        };
      } else {
        this.emit("mouseDown", this.getFirstButtonData());
        emitMouseMove()
        document.addEventListener("mousemove", emitMouseMove);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", emitMouseMove);
          this.emit("mouseUp", this.getFirstButtonData());
        };
      }
    };

    this.button1.addEventListener("mousedown", useHandlers);
    if (this.isRangeSlider) this.button2.addEventListener("mousedown", useHandlers);
  }

  addFieldHandler(): void {
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;

    const useHandlers = () => {
      if (this.findNearestButton() === "button2") {
        this.emit("mouseMove2", this.getSecondButtonData());
        this.emit("mouseUp2", this.getSecondButtonData());
      }
      else {
        this.emit("mouseMove", this.getFirstButtonData());
        this.emit("mouseUp", this.getFirstButtonData());
      }
    };

    this.field.addEventListener("mousedown", useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (event: any) => {
      const value = event.currentTarget.innerHTML;

      if (this.findNearestButton() === "button2") {
        this.emit("scaleClick2", { value, ...this.getSecondButtonData() });
      } else this.emit("scaleClick", { value, ...this.getFirstButtonData()});
    };

    const spans = this.field.nextElementSibling!.querySelectorAll("span");
    spans.forEach((element) => element.addEventListener("click", handleScaleClick));
  }

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
    this.slider = View.slider.div;
    this.field = View.field.div;
    this.button1 = View.button1.div;
    if(this.isRangeSlider) this.button2 = View.button2.div;
  }

  private findNearestButton() {
    if(!this.isRangeSlider) return "button1"
    if (this.mouseCoords > (this.getButtonOffset2() + this.getButtonOffset()) / 2) return "button2";
    return "button1";
  }

  getButtonOffset(): number {
    let buttonOffset = this.button1.offsetLeft;
    if(!this.isHorizontal) buttonOffset = this.button1.offsetTop;
    console.log(buttonOffset);
    return buttonOffset
  }

  getButtonOffset2(): number {
    let buttonOffset = this.button2.offsetLeft;
    if(!this.isHorizontal) buttonOffset = this.button2.offsetTop;
    console.log(buttonOffset);
    return buttonOffset
  }

  getFirstButtonData() {
    return {
      button: this.button1,
      buttonOffset: this.getButtonOffset(),
      mouseCoords: this.mouseCoords,
    }
  }

  getSecondButtonData() {
    return {
      button: this.button2,
      buttonOffset: this.getButtonOffset2(),
      mouseCoords: this.mouseCoords,
    }
  }
}
export default ViewHandler;
