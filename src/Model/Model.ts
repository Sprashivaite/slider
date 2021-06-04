import IModelConfig from './IModelConfig';
import Observer from '../Observer/Observer';
import { DEFAULT_MODEL_CONFIG } from '../defaults';

class Model extends Observer {
  config!: IModelConfig;

  shift!: number;

  elementsSize!: { buttonSize: number; fieldSize: number };

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    super();
    this.init(config);
  }

  updateButtonPX(button: HTMLElement, value: number): void {
    const result: number = this.demarcateButtons(button, value);
    if (!this.findFirstButton(button)) this.emit('updateButtonPX', result);
    else this.emit('updateButtonPX2', result);
  }

  updateButtonValue(button: HTMLElement, value: number): void {
    const result = Number(value.toFixed(this.calcDigitsAfterDot()));
    if (!this.findFirstButton(button)) this.emit('updateButtonValue', result);
    else this.emit('updateButtonValue2', result);
  }

  setElementsSize(data: { buttonSize: number; fieldSize: number }): void {
    const { fieldSize = 0, buttonSize = 0 } = data;

    this.elementsSize = {
      fieldSize: fieldSize - buttonSize,
      buttonSize,
    };
  }

  calcShift(data: { buttonOffset: number; mouseCoords: number }): void {
    const { buttonOffset, mouseCoords } = data;
    this.shift = mouseCoords - buttonOffset;
  }

  calcButtonOffset(data: { button: HTMLElement; mouseCoords: number }): void {
    const { button, mouseCoords } = data;
    const { fieldSize } = this.elementsSize;

    const shiftLeft: number = mouseCoords - this.shift;

    if (shiftLeft >= fieldSize) this.updateButtonPX(button, fieldSize);
    else if (shiftLeft <= 0) this.updateButtonPX(button, 0);
    else this.updateButtonPX(button, shiftLeft);
  }

  calcStopPointPX(data: { button: HTMLElement; buttonOffset: number }): void {
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

  calcFlagValue(data: { button: HTMLElement; buttonOffset: number }): void {
    const { max, min } = this.config;
    const { button, buttonOffset } = data;
    const { fieldSize } = this.elementsSize;    

    const part: number = min + (buttonOffset * (max - min)) / fieldSize;

    const digitsAfterDot: number = this.calcDigitsAfterDot()
    const fixedPart = Number(part.toFixed(digitsAfterDot));

    const result: number = this.findNearestValue(fixedPart);

    this.updateButtonValue(button, result);
  }

  moveToValue(data: { button: HTMLElement; value: number }): void {
    const { button, value } = data;
    const { max, min } = this.config;
    const { fieldSize } = this.elementsSize;

    const result: number = (fieldSize / (max - min)) * (value - min);

    this.updateButtonPX(button, result);
  }  

  calcScaleValues(quantity: number): void {
    const { max, min, step } = this.config;
    
    let modelQuantity = quantity;
    const quantityModelValues = (max - min) / step + 1;
    
    if (quantity < 3) modelQuantity = 3;
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
    let { max, min, step, isHorizontal } = this.config;

    if (typeof max !== 'number' || max <= min) max = 100;
    if (typeof min !== 'number' || min >= max) min = 0;
    if (typeof step !== 'number' || step <= 0) step = 1;
    if (typeof isHorizontal !== 'boolean') isHorizontal = true;

    this.config = { max, min, step, isHorizontal };
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
  
  private demarcateButtons(button: HTMLElement, value: number): number {
    const { isHorizontal } = this.config;
    const { buttonSize } = this.elementsSize;

    if (this.findSecondButton(button)) {
      let nextButtonOffset: number =
        button.nextElementSibling!.offsetLeft - buttonSize;
      if (!isHorizontal) {
        nextButtonOffset = button.nextElementSibling!.offsetTop - buttonSize;
      }
      if (value >= nextButtonOffset) return nextButtonOffset;
    }

    if (this.findFirstButton(button)) {
      let prevButtonOffset: number =
        button.previousElementSibling!.offsetLeft + buttonSize;
      if (!isHorizontal) {
        prevButtonOffset =
          button.previousElementSibling!.offsetTop + buttonSize;
      }
      if (value <= prevButtonOffset) return prevButtonOffset;
    }

    return value;
  }

  private findFirstButton(button: HTMLElement): boolean {
    return !!button.previousElementSibling;
  }

  private findSecondButton(button: HTMLElement): boolean {
    return !!(
      button.nextElementSibling.getAttribute('class') === 'slider__button'
    );
  }


}
export default Model;
