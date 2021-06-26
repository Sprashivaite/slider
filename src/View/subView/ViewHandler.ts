import IView from '../IView';
import Observer from '../../Observer/Observer';
import { viewHandleData } from '../../types';

class ViewHandler extends Observer {
  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  firstHandle!: HTMLDivElement;

  secondHandle!: HTMLDivElement;

  constructor(View: IView) {
    super();
    this.init(View);
  }

  getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      const direction = this.isHorizontal ? 'left': 'top';
      const coordinate = this.isHorizontal ? 'clientX': 'clientY';
      this.mouseCoords = (
        event[coordinate] - this.field.getBoundingClientRect()[direction]
      )
    };
    document.addEventListener('mousemove', Coords);
  }

  addHandleHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.findFirstHandle(event)) this.handleSecondHandle()
      else this.handleFirstHandle()
    };
    this.firstHandle.addEventListener('mousedown', useHandlers);
    if (this.isRangeSlider) {
      this.secondHandle.addEventListener('mousedown', useHandlers);
    }
  }

  addFieldHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.findFirstHandle(event)) {
        this.emit('secondHandleMouseMove', this.getSecondHandleData());
        this.emit('secondHandleMouseUp', this.getSecondHandleData());
      } else {
        this.emit('firstHandleMouseMove', this.getFirstHandleData());
        this.emit('firstHandleMouseUp', this.getFirstHandleData());
      }
    };    
    this.field.addEventListener('mousedown', useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;
      if (!this.findFirstHandle(event)) {
        this.emit('secondHandleScaleClick', {value, ...this.getSecondHandleData()});
        this.emit('secondHandleMouseUp', this.getSecondHandleData());
      } else {
        this.emit('firstHandleScaleClick', {value, ...this.getFirstHandleData()});
        this.emit('firstHandleMouseUp', this.getFirstHandleData());
      }
    };
    const scaleChildren = this.field.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) => (
      element.addEventListener('click', handleScaleClick))
    );
  }

  getFirstHandleData(): viewHandleData {
    return {
      handle: this.firstHandle,
      handleOffset: this.getFirstHandleOffset(),
      mouseCoords: this.mouseCoords,
      handleName: 'first'
    };
  }

  getSecondHandleData(): viewHandleData {
    return {
      handle: this.secondHandle,
      handleOffset: this.getSecondHandleOffset(),
      mouseCoords: this.mouseCoords,
      handleName: 'second'
    };
  }

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
    this.slider = View.slider.divElement;
    this.field = View.field.divElement;
    this.firstHandle = View.firstHandle.divElement;
    if (this.isRangeSlider) this.secondHandle = View.secondHandle.divElement;
  }

  private findFirstHandle(event: MouseEvent): boolean {
    if (!this.isRangeSlider) return true;
    if (event.target === this.firstHandle) return true;
    if (event.target === this.secondHandle) return false;
    const offsetSize = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const betweenHandles =
      (this.getSecondHandleOffset() +
        this.getFirstHandleOffset() +
        this.firstHandle[offsetSize]) / 2;
    const isHandleClose = this.mouseCoords > betweenHandles;
    if (isHandleClose) return false;
    return true;
  }

  private handleFirstHandle(): void {
    const emitMouseMove = () => (
      this.emit('firstHandleMouseMove', this.getFirstHandleData())
  );
  this.emit('firstHandleMouseDown', this.getFirstHandleData());
  emitMouseMove();
  document.addEventListener('mousemove', emitMouseMove);
  document.onmouseup = () => {
    document.removeEventListener('mousemove', emitMouseMove);
    this.emit('firstHandleMouseUp', this.getFirstHandleData());
    document.onmouseup = null;
  };
  }

  private handleSecondHandle(): void {
    const emitMouseMove = () => (
      this.emit('secondHandleMouseMove', this.getSecondHandleData())
    );
    this.emit('secondHandleMouseDown', this.getSecondHandleData());
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit('secondHandleMouseUp', this.getSecondHandleData());
      document.onmouseup = null;
    };
  }

  private getFirstHandleOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const handleOffset = this.firstHandle[offsetDirection];
    return handleOffset;
  }

  private getSecondHandleOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const handleOffset = this.secondHandle[offsetDirection];
    return handleOffset;
  }
}
export default ViewHandler;
