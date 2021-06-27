import IView from '../IView';
import Observer from '../../Observer/Observer';
import { viewPointData } from '../../types';

class ViewHandler extends Observer {
  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  firstPoint!: HTMLDivElement;

  secondPoint!: HTMLDivElement;

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

  addPointHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.findFirstPoint(event)) this.handleSecondPoint()
      else this.handleFirstPoint()
    };
    this.firstPoint.addEventListener('mousedown', useHandlers);
    if (this.isRangeSlider) {
      this.secondPoint.addEventListener('mousedown', useHandlers);
    }
  }

  addFieldHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.findFirstPoint(event)) {
        this.emit('secondPointMouseMove', this.getSecondPointData());
        this.emit('secondPointMouseUp', this.getSecondPointData());
      } else {
        this.emit('firstPointMouseMove', this.getFirstPointData());
        this.emit('firstPointMouseUp', this.getFirstPointData());
      }
    };    
    this.field.addEventListener('mousedown', useHandlers);
  }

  addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;
      if (!this.findFirstPoint(event)) {
        this.emit('secondPointScaleClick', {value, ...this.getSecondPointData()});
        this.emit('secondPointMouseUp', this.getSecondPointData());
      } else {
        this.emit('firstPointScaleClick', {value, ...this.getFirstPointData()});
        this.emit('firstPointMouseUp', this.getFirstPointData());
      }
    };
    const scaleChildren = this.field.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) => (
      element.addEventListener('click', handleScaleClick))
    );
  }

  getFirstPointData(): viewPointData {
    return {
      point: this.firstPoint,
      pointOffset: this.getFirstPointOffset(),
      mouseCoords: this.mouseCoords,
      pointName: 'first'
    };
  }

  getSecondPointData(): viewPointData {
    return {
      point: this.secondPoint,
      pointOffset: this.getSecondPointOffset(),
      mouseCoords: this.mouseCoords,
      pointName: 'second'
    };
  }

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
    this.slider = View.slider.divElement;
    this.field = View.field.divElement;
    this.firstPoint = View.firstPoint.divElement;
    if (this.isRangeSlider) this.secondPoint = View.secondPoint.divElement;
  }

  private findFirstPoint(event: MouseEvent): boolean {
    if (!this.isRangeSlider) return true;
    if (event.target === this.firstPoint) return true;
    if (event.target === this.secondPoint) return false;
    const offsetSize = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const betweenPoints =
      (this.getSecondPointOffset() +
        this.getFirstPointOffset() +
        this.firstPoint[offsetSize]) / 2;
    const isPointClose = this.mouseCoords > betweenPoints;
    if (isPointClose) return false;
    return true;
  }

  private handleFirstPoint(): void {
    const emitMouseMove = () => (
      this.emit('firstPointMouseMove', this.getFirstPointData())
  );
  this.emit('firstPointMouseDown', this.getFirstPointData());
  emitMouseMove();
  document.addEventListener('mousemove', emitMouseMove);
  document.onmouseup = () => {
    document.removeEventListener('mousemove', emitMouseMove);
    this.emit('firstPointMouseUp', this.getFirstPointData());
    document.onmouseup = null;
  };
  }

  private handleSecondPoint(): void {
    const emitMouseMove = () => (
      this.emit('secondPointMouseMove', this.getSecondPointData())
    );
    this.emit('secondPointMouseDown', this.getSecondPointData());
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit('secondPointMouseUp', this.getSecondPointData());
      document.onmouseup = null;
    };
  }

  private getFirstPointOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const pointOffset = this.firstPoint[offsetDirection];
    return pointOffset;
  }

  private getSecondPointOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const pointOffset = this.secondPoint[offsetDirection];
    return pointOffset;
  }
}
export default ViewHandler;
