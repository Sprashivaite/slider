import IModelConfig from './IModelConfig';
import Observer from '../Observer/Observer';
import { DEFAULT_MODEL_CONFIG } from '../defaults';
import ViewData from '../types'

class Model extends Observer {
  config!: IModelConfig;

  shift!: number;

  elementsSize!: { buttonSize: number; fieldSize: number };

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    super();
    this.init(config);
  }

  setElementsSize(data: { buttonSize: number; fieldSize: number }): void {
    const { fieldSize = 0, buttonSize = 0 } = data;

    this.elementsSize = {
      fieldSize: fieldSize - buttonSize,
      buttonSize,
    };
  }

  calcShift(data: ViewData): void {
    const { buttonOffset, mouseCoords } = data;
    this.shift = mouseCoords - buttonOffset;
  }

  calcButtonOffset(data: ViewData): void {
    const { button, mouseCoords } = data;
    const { fieldSize } = this.elementsSize;

    const shiftLeft: number = mouseCoords - this.shift;

    if (shiftLeft >= fieldSize) this.updateButtonPX(button, fieldSize);
    else if (shiftLeft <= 0) this.updateButtonPX(button, 0);
    else this.updateButtonPX(button, shiftLeft);
  }

  calcStopPointPX(data: ViewData): void {
    const { max, min, step } = this.config;
    const { button, buttonOffset } = data;
    const { fieldSize } = this.elementsSize;

    const stepPX: number = (fieldSize * step) / (max - min);

    const arrStopPoints: number[] = [];
    for (let i = 0; i <= fieldSize; i += stepPX) arrStopPoints.push(i) 

    let stopPoint: number | undefined = arrStopPoints.find(
      (item) => buttonOffset <= item + stepPX / 2
    );

    if (stopPoint === undefined) stopPoint = fieldSize;

    this.updateButtonPX(button, stopPoint);
  }

  calcFlagValue(data: ViewData): void {
    const { max, min } = this.config;
    const { button, buttonOffset } = data;
    const { fieldSize } = this.elementsSize;    

    const part: number = min + (buttonOffset * (max - min)) / fieldSize;

    const digitsAfterDot: number = this.calcDigitsAfterDot()
    const fixedPart = Number(part.toFixed(digitsAfterDot));

    const result: number = this.findNearestValue(fixedPart);

    this.updateButtonValue(button, result);
  }

  moveToValue(data: ViewData): void {
    const { button, value } = data;
    const { max, min } = this.config;
    const { fieldSize } = this.elementsSize;

    const result: number = (fieldSize / (max - min)) * (value! - min);

    this.updateButtonPX(button, result);
  }  

  calcScaleValues(quantity: number): void {
    const { max, min, step } = this.config;
    
    let modelQuantity = quantity;
    const quantityModelValues = (max - min) / step + 1;
    
    if (quantity < 3) modelQuantity = 2;
    if (quantityModelValues < quantity) modelQuantity = Number(quantityModelValues.toFixed(0));

    let value = min;
    const stepValues = (max - min) / (modelQuantity - 1);

    const digitsAfterDot: number = this.calcDigitsAfterDot()
    const stepValuesFixed = Number(stepValues.toFixed(digitsAfterDot))

    const arrValues: Array<number> = [];
    for (let i = 0; i < modelQuantity - 1; i += 1) {
      const result = this.findNearestValue(value);
      arrValues.push(Number(result.toFixed(digitsAfterDot)));
      value += stepValuesFixed;
    }
    arrValues.push(max);

    this.emit('scaleUpdate', { arrValues, quantity: modelQuantity });
  }

  private init(config: IModelConfig): void {
    this.config = { ...DEFAULT_MODEL_CONFIG, ...config };
    this.validate();
    this.shift = 0;
  }

  private validate(): void {
    let { max, min, step } = this.config;

    if (typeof max !== 'number' || max <= min) max = 100;
    if (typeof min !== 'number' || min >= max) min = 0;
    if (typeof step !== 'number' || step <= 0) step = 1;

    this.config = { max, min, step };
  }

  private updateButtonPX(button: HTMLElement, value: number): void {
    if (!button.previousElementSibling) this.emit('updateButtonPX', value);
    else this.emit('updateButtonPX2', value);
  }

  private updateButtonValue(button: HTMLElement, value: number): void {
    const result = Number(value.toFixed(this.calcDigitsAfterDot()));
    if (!button.previousElementSibling) this.emit('updateButtonValue', result);
    else this.emit('updateButtonValue2', result);
  }

  private calcDigitsAfterDot(): number {
    const { step } = this.config;
    const isIncludeDot = step.toString().includes('.');
    const digitsAfterDot = step.toString().split('.').pop()!.length;
    return isIncludeDot ? digitsAfterDot : 0;
  }

  private findNearestValue(value: number): number {
    const { max, min, step } = this.config;

    const stepsPoints: number[] = [];
    for (let i = min; i <= max; i += step) stepsPoints.push(i);

    let nearestValue: number | undefined = stepsPoints.find(
      (item, index, array) => {
        const halfStepRes = value + step / 2;
        return halfStepRes >= item && halfStepRes < array[index + 1];
      }
    );
    if (nearestValue === undefined) nearestValue = stepsPoints.pop()!;
    return nearestValue;
  }
}
export default Model;
