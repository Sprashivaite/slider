import IView from '../IView';
import Observer from '../../Observer/Observer';
import { viewHandleData } from '../../types';

class ViewHandler extends Observer {
  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  firstButton!: HTMLDivElement;

  secondButton!: HTMLDivElement;

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
      this.emit('firstButtonMouseMove', this.getFirstButtonData());
    const emitMouseMove2 = () =>
      this.emit('secondButtonMouseMove', this.getSecondButtonData());

    const useHandlers = (event: MouseEvent) => {
      if (!this.findFirstButton(event)) {
        this.emit('secondButtonMouseDown', this.getSecondButtonData());
        emitMouseMove2();
        document.addEventListener('mousemove', emitMouseMove2);
        document.onmouseup = () => {
          document.removeEventListener('mousemove', emitMouseMove2);
          this.emit('secondButtonMouseUp', this.getSecondButtonData());
          document.onmouseup = null;
        };
      } else {
        this.emit('firstButtonMouseDown', this.getFirstButtonData());
        emitMouseMove();
        document.addEventListener('mousemove', emitMouseMove);
        document.onmouseup = () => {
          document.removeEventListener('mousemove', emitMouseMove);
          this.emit('firstButtonMouseUp', this.getFirstButtonData());
          document.onmouseup = null;
        };
      }
    };
    this.firstButton.addEventListener('mousedown', useHandlers);
    if (this.isRangeSlider)
      this.secondButton.addEventListener('mousedown', useHandlers);
  }

  addFieldHandler(): void {
    this.field.onmousedown = () => false;
    this.field.oncontextmenu = () => false;

    const useHandlers = (event: MouseEvent) => {
      if (!this.findFirstButton(event)) {
        this.emit('secondButtonMouseMove', this.getSecondButtonData());
        this.emit('secondButtonMouseUp', this.getSecondButtonData());
      } else {
        this.emit('firstButtonMouseMove', this.getFirstButtonData());
        this.emit('firstButtonMouseUp', this.getFirstButtonData());
      }
    };
    this.field.addEventListener('mousedown', useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;

      if (!this.findFirstButton(event)) {
        this.emit('secondButtonScaleClick', {
          value,
          ...this.getSecondButtonData(),
        });
        this.emit('secondButtonMouseUp', this.getSecondButtonData());
      } else {
        this.emit('firstButtonScaleClick', {
          value,
          ...this.getFirstButtonData(),
        });
        this.emit('firstButtonMouseUp', this.getFirstButtonData());
      }
    };

    const scaleChildren =
      this.field.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) =>
      element.addEventListener('click', handleScaleClick)
    );
  }

  getFirstButtonData(): viewHandleData {
    return {
      button: this.firstButton,
      buttonOffset: this.getFirstButtonOffset(),
      mouseCoords: this.mouseCoords,
    };
  }

  getSecondButtonData(): viewHandleData {
    return {
      button: this.secondButton,
      buttonOffset: this.getSecondButtonOffset(),
      mouseCoords: this.mouseCoords,
    };
  }

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
    this.slider = View.slider.div;
    this.field = View.field.div;
    this.firstButton = View.firstButton.div;
    if (this.isRangeSlider) this.secondButton = View.secondButton.div;
  }

  private findFirstButton(event: MouseEvent): boolean {
    if (!this.isRangeSlider) return true;
    if (event.target === this.firstButton) return true;
    if (event.target === this.secondButton) return false;
    const offsetSize = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const betweenButtons =
      (this.getSecondButtonOffset() +
        this.getFirstButtonOffset() +
        this.firstButton[offsetSize]) /
      2;

    const isButtonClose = this.mouseCoords > betweenButtons;
    if (isButtonClose) return false;
    return true;
  }

  private getFirstButtonOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const buttonOffset = this.firstButton[offsetDirection];
    return buttonOffset;
  }

  private getSecondButtonOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const buttonOffset = this.secondButton[offsetDirection];
    return buttonOffset;
  }
}
export default ViewHandler;
