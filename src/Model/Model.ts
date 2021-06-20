import Observer from '../Observer/Observer';
import { DEFAULT_MODEL_CONFIG } from '../defaults';
import { ViewHandleData, elementsSize, ModelConfig } from '../types';

class Model extends Observer {
  private config!: ModelConfig;

  private shift: number;

  private elementsSize!: { fieldSize: number; buttonSize: number };

  constructor(config = DEFAULT_MODEL_CONFIG as ModelConfig) {
    super();    
    this.shift = 0;
    this.init(config);
  }

  setConfig(config: ModelConfig): void {
    this.config = { ...this.config, ...config };
    this.validate();
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

    if (shiftLeft >= fieldSize) {
      this.updateButton({ ...data, value: fieldSize });
    } else if (shiftLeft <= 0) {
      this.updateButton({ ...data, value: 0 });
    } else {
      this.updateButton({ ...data, value: shiftLeft });
    }
  }

  calcStopPointPX(data: ViewHandleData): void {
    const { max, min, step } = this.config;
    const { buttonOffset } = data;
    const { fieldSize } = this.elementsSize;

    const stepPX: number = (fieldSize * step) / (max - min);
    let stopPoint = fieldSize

    for (let i = 0; i <= fieldSize; i += stepPX) {
      const isLessThenStep = buttonOffset <= i + stepPX / 2      
      if (isLessThenStep) {
        stopPoint = i
        break;
      }
    }
    this.updateButton({ ...data, value: stopPoint });
  }

  calcFlagValue(buttonOffset: number): number {
    const { max, min } = this.config;
    const offset = buttonOffset;
    const { fieldSize } = this.elementsSize;

    const value: number = min + (offset * (max - min)) / fieldSize;
    const roundedValue: number = this.roundByStep(value)

    if (roundedValue === max) return roundedValue
    return this.findNearestValue(roundedValue);
  }

  moveToValue(data: ViewHandleData): void {
    const { value } = data;
    const { max, min } = this.config;
    const { fieldSize } = this.elementsSize;

    const result: number = (fieldSize / (max - min)) * (value! - min);

    this.updateButton({ ...data, value: result });
  }

  calcScaleValues(): void {
    const { max, min, scaleQuantity } = this.config;

    const scaleStep = (max - min) / (scaleQuantity - 1);

    const scaleValues: Array<number> = [];
    let stepValue: number = min;
    let result: number;

    for (stepValue; stepValue < max; stepValue += scaleStep) {
      result = this.findNearestValue(stepValue);
      scaleValues.push(result);
    }
    if (scaleValues.length >= scaleQuantity) scaleValues.length = scaleQuantity - 1
    scaleValues.push(max);

    this.emit('scaleUpdate', { scaleValues, quantity: scaleQuantity });
  }

  private init(config: ModelConfig): void {
    this.config = { ...DEFAULT_MODEL_CONFIG, ...config };
    this.validate();
  }

  private validate(): void {
    this.validateMinMax();
    this.validateStep();
    this.validateScaleQuantity();
  }

  private validateMinMax(): void {
    let { max, min } = this.config;
    if (typeof min !== 'number') min = 0;
    if (min >= max) min = max - 1;
    if (typeof max !== 'number') max = 100;
    if (max <= min) max = min + 1;
    this.config = {...this.config, max, min };
  }

  private validateStep(): void {
    const { max, min } = this.config;
    let { step } = this.config;
    
    if (typeof step !== 'number') step = 1;
    if (step >= max - min) step = max - min;
    if (step <= 0) step = 1;

    const validateLargeNumbers = (value: number): number => {
      if (value * 1000 >= max - min) return value;
      return validateLargeNumbers(value * 10);
    };

    step = validateLargeNumbers(step);
    this.config = {...this.config, step };
  }

  private validateScaleQuantity(): void {
    const { max, min, step } = this.config;
    let { scaleQuantity } = this.config;

    if (typeof scaleQuantity !== 'number' || scaleQuantity < 2) {
      scaleQuantity = 2;
    }
    const quantitySteps = (max - min) / step + 1;

    if (quantitySteps < scaleQuantity) scaleQuantity = quantitySteps;
    scaleQuantity = Number(scaleQuantity.toFixed(0));

    this.config = {...this.config, scaleQuantity };
  }

  private updateButton(data: ViewHandleData): void {
    const { button, value } = data;
    const flagValue = this.calcFlagValue(value!);
    if (!button.previousElementSibling) {
      this.emit('updateFirstButtonPX', value);
      this.emit('updateFirstButtonValue', flagValue);
    } else {
      this.emit('updateSecondButtonPX', value);
      this.emit('updateSecondButtonValue', flagValue);
    }
  }

  private roundByStep(value: number): number {
    const { step } = this.config;
    const isDot = step.toString().includes('.');
    const digitsAfterDot = String(step).split('.').pop()!.length;

    return isDot ? Number(value.toFixed(digitsAfterDot)) : Number(value.toFixed(0));
  }

  private findNearestValue(value: number): number {
    const { max, min, step } = this.config;

    const roundedValue = this.roundByStep(value)
    let result = max;

    for (let i = min; i <= max; i += step) {
      i = this.roundByStep(i)
      if (roundedValue >= i) result = i
    }

    return this.roundByStep(result);
  }
}
export default Model;
