/* eslint-disable no-undef */
import ISubscriber from "./ISubscriber";
import IView from "../IView";
import Observable from "../../Observable/Observable";

class ViewHandler extends Observable {
  subscriber!: ISubscriber;

  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLDivElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  button1!: HTMLDivElement;

  button2: HTMLDivElement | undefined;

  constructor(View: IView) {
    super();
    this.init(View);
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      if (this.isHorizontal) this.mouseCoords = event.clientX;
      if (!this.isHorizontal) this.mouseCoords = event.clientY;
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

    this.button1.div.addEventListener("mousedown", useHandlers);
    if (this.isRangeSlider) this.button2.div.addEventListener("mousedown", useHandlers);
  }

  addFieldHandler(): void {
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;

    const useHandlers = () => {
      if (this.findNearestButton() === "button2") this.emit("mouseMove2", this.getSecondButtonData());
      else this.emit("mouseMove", this.getFirstButtonData());
    };

    this.field.addEventListener("mousedown", useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (event) => {
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
    this.button1 = View.button1;
    if (View.button2) this.button2 = View.button2;
  }

  private findNearestButton() {
    let buttonOffset = this.button1.div.getBoundingClientRect().left;
    let buttonOffset2;
    if (this.isRangeSlider)
      buttonOffset2 = this.button2.div!.getBoundingClientRect().left;
    if (!this.isHorizontal) {
      buttonOffset = this.button1.div.getBoundingClientRect().top;
      if (this.isRangeSlider)
        buttonOffset2 = this.button2.div!.getBoundingClientRect().top;
    }
    if (this.mouseCoords > (buttonOffset2 + buttonOffset) / 2) return "button2";
    return "button1";
  }

  private getFirstButtonData() {
    return {
      button: this.button1.div,
      mouseCoords: this.mouseCoords,
    }
  }

  private getSecondButtonData() {
    return {
      button: this.button2.div,
      mouseCoords: this.mouseCoords,
    }
  }
}
export default ViewHandler;
