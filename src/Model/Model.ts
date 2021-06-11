import IModelConfig from './IModelConfig';
import Observer from '../Observer/Observer';
import { DEFAULT_MODEL_CONFIG } from '../defaults';
import { ViewHandleData, elementsSize } from '../types';

class Model extends Observer {
  config!: IModelConfig;

  shift!: number;

  elementsSize!: { fieldSize: number; buttonSize: number; };

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    super();
    this.init(config);
  }

  setElementsSize(data: elementsSize): void {
    const { fieldSize = 0, buttonSize = 0 } = data;

    this.elementsSize = {
      fieldSize: fieldSize - buttonSize,
      buttonSize,
    };
  }

  calcShift(data: ViewHandleData): void {
    const { buttonOffset, mouseCoords } = data;
    this.shift = mouseCoords - buttonOffset;
  }

  calcButtonOffset(data: ViewHandleData): void {
    const { mouseCoords } = data;
    const { fieldSize } = this.elementsSize;

    const shiftLeft: number = mouseCoords - this.shift;

    if (shiftLeft >= fieldSize) this.updateButtonPX({ ...data, value: fieldSize });
    else if (shiftLeft <= 0) this.updateButtonPX({ ...data, value: 0 });
    else this.updateButtonPX({ ...data, value: shiftLeft });
  }

  calcStopPointPX(data: ViewHandleData): void {
    const { max, min, step } = this.config;
    const { buttonOffset } = data;
    const { fieldSize } = this.elementsSize;

    const stepPX: number = (fieldSize * step) / (max - min);

    const arrStopPoints: number[] = [];
    for (let i = 0; i <= fieldSize; i += stepPX) {
      i = Number(i.toFixed(2))
      arrStopPoints.push((i) );      
    }

    let stopPoint: number | undefined = arrStopPoints.find(
      (item) => buttonOffset <= item + stepPX / 2
    );
    if (stopPoint === undefined) stopPoint = arrStopPoints.pop();

    this.updateButtonPX({ ...data, value: stopPoint });
  }

  calcFlagValue(data: ViewHandleData): number {
    const { max, min } = this.config;
    const { buttonOffset } = data;
    const { fieldSize } = this.elementsSize;

    const part: number = min + (buttonOffset * (max - min)) / fieldSize;

    const digitsAfterDot: number = this.calcDigitsAfterDot();
    const fixedPart = Number(part.toFixed(digitsAfterDot));

    const result: number = this.findNearestValue(fixedPart);
    const roundedResult = Number(result.toFixed(this.calcDigitsAfterDot()));
    return roundedResult;
  }

  moveToValue(data: ViewHandleData): void {
    const { value } = data;
    const { max, min } = this.config;
    const { fieldSize } = this.elementsSize;

    const result: number = (fieldSize / (max - min)) * (value! - min);

    this.updateButtonPX({ ...data, value: result });
  }

  calcScaleValues(quantity: number): void {
    const { max, min, step } = this.config;

    let modelQuantity = quantity;
    const quantityModelValues = (max - min) / step + 1;

    if (quantity < 3) modelQuantity = 2;
    if (quantityModelValues < quantity)
      modelQuantity = Number(quantityModelValues.toFixed(0));

    let value = min;
    const stepValues = (max - min) / (modelQuantity - 1);

    const digitsAfterDot: number = this.calcDigitsAfterDot();
    const stepValuesFixed = Number(stepValues.toFixed(digitsAfterDot));

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
    if (step >= max - min) step = max - min;

    this.config = { max, min, step };
  }

  private updateButtonPX(data: ViewHandleData): void {
    const { button, value } = data;
    const flagValue = this.calcFlagValue(data);
    if (!button.previousElementSibling) {
      this.emit('updateButtonValue', flagValue);
      this.emit('updateButtonPX', value);
    } else {
      this.emit('updateButtonValue2', flagValue);
      this.emit('updateButtonPX2', value);
    }
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
