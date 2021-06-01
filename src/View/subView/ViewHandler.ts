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

  addButtonHandler1(): void {
    const handler = () => this.emitMouseMove()
    const useHandler = () => {
      this.emit("mouseDown", {
        button: this.button1.div,
        mouseCoords: this.mouseCoords,
      });
      document.addEventListener("mousemove", handler);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", handler);
        this.emit("mouseUp", { button: this.button1.div });
      };
    };

    if (!this.isRangeSlider) {
      this.button1.div.addEventListener("mousedown", useHandler);
    }
  }

  addButtonHandler2(): void {
    const handler = () =>
      this.emit("mouseMove", {
        button: this.button1.div,
        mouseCoords: this.mouseCoords,
      });
    const handler2 = () =>
      this.emit("mouseMove", {
        button: this.button2.div,
        mouseCoords: this.mouseCoords,
      });
    const useHandlers = () => {
      if (this.findNearestButton() === "button2") {
        this.emit("mouseDown2", {
          button: this.button2.div,
          mouseCoords: this.mouseCoords,
        });
        this.emit("mouseMove2", {
          button: this.button2.div,
          mouseCoords: this.mouseCoords,
        });
        document.addEventListener("mousemove", handler2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler2);
          this.emit("mouseUp2", { button: this.button2.div });
        };
      } else {
        this.emit("mouseDown", {
          button: this.button1.div,
          mouseCoords: this.mouseCoords,
        });
        this.emit("mouseMove", {
          button: this.button1.div,
          mouseCoords: this.mouseCoords,
        });
        document.addEventListener("mousemove", handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", handler);
          this.emit("mouseUp", { button: this.button1.div });
        };
      }
    };

    this.button2.div.addEventListener("mousedown", useHandlers);
    this.button1.div.addEventListener("mousedown", useHandlers);
  }

  addFieldHandler(): void {
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;

    const useHandlers = () => {
      if (this.findNearestButton() === "button2") this.emitMouseMove2();
      else this.emitMouseMove();
    };

    this.field.addEventListener("mousedown", useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (value) => {
      this.emit("scaleClick", { value, button: this.button1.div });
    };
    const handleScaleClick2 = (value) => {
      this.emit("scaleClick2", { value, button: this.button2.div });
    };

    const useHandler = (event) => {
      const value = event.currentTarget.innerHTML;
      if (this.findNearestButton() === "button2") handleScaleClick2(value);
      else handleScaleClick(value);
    };

    const spans = this.field.nextElementSibling!.querySelectorAll("span");
    spans.forEach((element) => element.addEventListener("click", useHandler));
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

  private emitMouseMove(): void {
    this.emit("mouseMove", {
      button: this.button1.div,
      mouseCoords: this.mouseCoords,
    });
  }

  private emitMouseMove2(): void {
    this.emit("mouseMove2", {
      button: this.button2.div,
      mouseCoords: this.mouseCoords,
    });
  }
}
export default ViewHandler;
