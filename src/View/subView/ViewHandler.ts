import IView from '../IView';
import Observer from '../../Observer/Observer';
import { ViewHandleData } from '../../types';

class ViewHandler extends Observer {
  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  button1!: HTMLDivElement;

  button2!: HTMLDivElement;

  buttonOffset1!: number;

  buttonOffset2!: number;

  constructor(View: IView) {
    super();
    this.init(View);
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      if (this.isHorizontal)
        this.mouseCoords =
          event.clientX - this.field.getBoundingClientRect().left;
      if (!this.isHorizontal)
        this.mouseCoords =
          event.clientY - this.field.getBoundingClientRect().top;
    };
    document.addEventListener('mousemove', Coords);
  }

  addButtonHandler(): void {
    const emitMouseMove = () =>
      this.emit('mouseMove', this.getFirstButtonData());
    const emitMouseMove2 = () =>
      this.emit('mouseMove2', this.getSecondButtonData());

    const useHandlers = () => {
      if (!this.findFirstButton()) {
        this.emit('mouseDown2', this.getSecondButtonData());
        emitMouseMove2();
        document.addEventListener('mousemove', emitMouseMove2);
        document.onmouseup = () => {
          document.removeEventListener('mousemove', emitMouseMove2);
          this.emit('mouseUp2', this.getSecondButtonData());
        };
      } else {
        this.emit('mouseDown', this.getFirstButtonData());
        emitMouseMove();
        document.addEventListener('mousemove', emitMouseMove);
        document.onmouseup = () => {
          document.removeEventListener('mousemove', emitMouseMove);
          this.emit('mouseUp', this.getFirstButtonData());
        };
      }
    };
    this.button1.addEventListener('mousedown', useHandlers);
    if (this.isRangeSlider)
      this.button2.addEventListener('mousedown', useHandlers);
  }

  addFieldHandler(): void {
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;

    const useHandlers = () => {
      if (!this.findFirstButton()) {
        this.emit('mouseMove2', this.getSecondButtonData());
        this.emit('mouseUp2', this.getSecondButtonData());
      } else {
        this.emit('mouseMove', this.getFirstButtonData());
        this.emit('mouseUp', this.getFirstButtonData());
      }
    };
    this.field.addEventListener('mousedown', useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;

      if (!this.findFirstButton()) {
        this.emit('scaleClick2', { value, ...this.getSecondButtonData() });
        this.emit('mouseUp2', this.getSecondButtonData());
      } else {
        this.emit('scaleClick', { value, ...this.getFirstButtonData() });
        this.emit('mouseUp', this.getFirstButtonData());
      }
    };

    const scaleChildren = this.field.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) =>
      element.addEventListener('click', handleScaleClick)
    );
  }

  getFirstButtonData(): ViewHandleData {
    return {
      button: this.button1,
      buttonOffset: this.getButtonOffset(),
      mouseCoords: this.mouseCoords,
    };
  }

  getSecondButtonData(): ViewHandleData {
    return {
      button: this.button2,
      buttonOffset: this.getButtonOffset2(),
      mouseCoords: this.mouseCoords,
    };
  }

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
    this.slider = View.slider.div;
    this.field = View.field.div;
    this.button1 = View.button1.div;
    if (this.isRangeSlider) this.button2 = View.button2.div;
  }

  private findFirstButton() {
    if (!this.isRangeSlider) return true;
    const isButtonClose =
      this.mouseCoords > (this.getButtonOffset2() + this.getButtonOffset()) / 2;
    if (isButtonClose) return false;
    return true;
  }

  private getButtonOffset(): number {
    let buttonOffset = this.button1.offsetLeft;
    if (!this.isHorizontal) buttonOffset = this.button1.offsetTop;
    return buttonOffset;
  }

  private getButtonOffset2(): number {
    let buttonOffset = this.button2.offsetLeft;
    if (!this.isHorizontal) buttonOffset = this.button2.offsetTop;
    return buttonOffset;
  }
}
export default ViewHandler;
