import IView from '../IView';
import Observer from '../../Observer/Observer';
import { pointData } from '../../types';

class ViewHandler extends Observer {
  mouseCoords!: number;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  isRangeSlider!: boolean;

  field!: HTMLDivElement;

  firstPoint!: any;

  secondPoint!: any;

  shift!: number;

  constructor(View: IView) {
    super();
    this.init(View);
  }

  addHandlers(): void {
    this.addFieldHandler();
    this.getMouseCoords();
    this.addScaleHandler();
    this.addPointHandler();
  }
  
  getFirstPointData(): pointData {
    return {
      point: this.firstPoint,
      pointOffset: this.firstPoint.getPointOffset(),
      pointName: 'first'
    };
  }

  getSecondPointData(): pointData {
    return {
      point: this.secondPoint,
      pointOffset: this.secondPoint.getPointOffset(),
      pointName: 'second'
    };
  }

  addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;
      if (!this.isFirstPointClosest(event)) {
        this.emit('scaleClick', {value, ...this.getSecondPointData()});
        this.emit('pointStopped', this.getSecondPointData());
      } else {
        this.emit('scaleClick', {value, ...this.getFirstPointData()});
        this.emit('pointStopped', this.getFirstPointData());
      }
    };
    const scaleChildren = this.field.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) => (
      element.addEventListener('click', handleScaleClick))
    );
  }  

  private init(View: IView) {
    this.mouseCoords = 0;
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
    this.slider = View.slider.divElement;
    this.field = View.field.divElement;
    this.firstPoint = View.firstPoint;
    if (this.isRangeSlider) this.secondPoint = View.secondPoint;
  }

  private getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      const direction = this.isHorizontal ? 'left': 'top';
      const coordinate = this.isHorizontal ? 'clientX': 'clientY';
      const size = this.isHorizontal ? 'offsetWidth': 'offsetHeight';
      this.mouseCoords = (
        (event[coordinate] - this.field.getBoundingClientRect()[direction])
      )
      this.mouseCoords = this.mouseCoords * 100 / this.field[size]
    };
    document.addEventListener('mousemove', Coords);
  }

  private addPointHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.isFirstPointClosest(event)) {
        this.handleSecondPoint()
      } else {
        this.handleFirstPoint()
      }
    };
    this.firstPoint.divElement.addEventListener('mousedown', useHandlers);
    if (this.isRangeSlider) {
      this.secondPoint.divElement.addEventListener('mousedown', useHandlers);
    }
  }

  private addFieldHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.isFirstPointClosest(event)) {
        this.secondPoint.movePoint(this.mouseCoords)
        this.emit('pointStopped', this.getSecondPointData());
      } else {
        this.firstPoint.movePoint(this.mouseCoords)
        this.emit('pointStopped', this.getFirstPointData());
      }
    };    
    this.field.addEventListener('mousedown', useHandlers);
  }

  private isFirstPointClosest(event: MouseEvent): boolean {
    if (!this.isRangeSlider) return true;
    if (event.target === this.firstPoint.divElement) return true;
    if (event.target === this.secondPoint.divElement) return false;
    const firstPointOffset = this.firstPoint.getPointOffset()
    const secondPointOffset = this.secondPoint.getPointOffset()
    const betweenPoints = (secondPointOffset + firstPointOffset) / 2
    const isPointClose = this.mouseCoords > betweenPoints;
    if (isPointClose) return false;
    return true;
  }

  private handleFirstPoint(): void {
    let shift: number;
    const emitMouseDown = () => {
      shift = this.mouseCoords - this.firstPoint.getPointOffset()
    }
    const emitMouseMove = () => {
      this.firstPoint.movePoint(this.mouseCoords - shift)
      if(this.firstPoint.getPointOffset() > this.secondPoint.getPointOffset()) {
        this.firstPoint.movePoint(this.secondPoint.getPointOffset())
      }      
      this.emit('pointMoving', this.getFirstPointData());
    };
    emitMouseDown();
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit('pointStopped', this.getFirstPointData());
      document.onmouseup = null;
    };
  }

  private handleSecondPoint(): void {
    let shift: number;
    const emitMouseDown = () => {
      shift = this.mouseCoords - this.secondPoint.getPointOffset()
    }
    const emitMouseMove = () => {
      this.secondPoint.movePoint(this.mouseCoords - shift)
      if(this.firstPoint.getPointOffset() > this.secondPoint.getPointOffset()) {
        this.secondPoint.movePoint(this.firstPoint.getPointOffset())
      }
      this.emit('pointMoving', this.getSecondPointData())
    };
    emitMouseDown();
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit('pointStopped', this.getSecondPointData());
      document.onmouseup = null;
    };
  } 
}
export default ViewHandler;
