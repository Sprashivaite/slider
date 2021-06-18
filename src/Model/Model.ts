import Observer from '../Observer/Observer';
import { DEFAULT_MODEL_CONFIG } from '../defaults';
import { ViewHandleData, elementsSize, ModelConfig } from '../types';

class Model extends Observer {
  config!: ModelConfig;

  shift!: number;

  elementsSize!: { fieldSize: number; buttonSize: number; };

  constructor(config = DEFAULT_MODEL_CONFIG as ModelConfig) {
    super();
    this.init(config);
  }

  setConfig(config: ModelConfig): void { 
    this.config = {...this.config, ...config };
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

    if (shiftLeft >= fieldSize) this.updateButton({ ...data, value: fieldSize });
    else if (shiftLeft <= 0) this.updateButton({ ...data, value: 0 });
    else this.updateButton({ ...data, value: shiftLeft });
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
    if (stopPoint === undefined) stopPoint = fieldSize;

    this.updateButton({ ...data, value: stopPoint });
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

    this.updateButton({ ...data, value: result });
  }

  calcScaleValues(): void {
    const { max, min, scaleQuantity } = this.config;
    
    let stepValue = min;
    const stepValues = (max - min) / (scaleQuantity - 1);

    const digitsAfterDot: number = this.calcDigitsAfterDot();
    const stepValuesFixed = Number(stepValues.toFixed(digitsAfterDot));

    const scaleValues: Array<number> = [];
    for (let i = 0; i < scaleQuantity - 1; i += 1) {
      const result = this.findNearestValue(stepValue);
      scaleValues.push(Number(result.toFixed(digitsAfterDot)));
      stepValue += stepValuesFixed;
    }
    scaleValues.push(max);
    
    this.emit('scaleUpdate', { scaleValues, quantity: scaleQuantity });
  }

  private init(config: ModelConfig): void {
    this.config = { ...DEFAULT_MODEL_CONFIG, ...config };
    this.validate();
    this.shift = 0;
  }

  private validate(): void {
    let { max, min, step, scaleQuantity} = this.config;

    if (typeof min !== 'number') min = 0
    if (min >= max) min = max - 1;
    if (typeof max !== 'number') max = 100
    if (max <= min) max = min + 1;
    step = this.validateStep()
    scaleQuantity = this.validateScaleQuantity()
    this.config = { max, min, step, scaleQuantity };
  }

  private validateStep(): number {
    const { max, min, step } = this.config;
    let invalidStep = step;
    if (typeof invalidStep !== 'number') invalidStep = 1
    if (invalidStep >= max - min) invalidStep = max - min;
    if (invalidStep <= 0) invalidStep = 1;
    
    const validateLargeNumbers = (value: number): number => {
      if (value * 1000 >= max - min) return value
      return validateLargeNumbers(value *10)      
    }

    const validStep = validateLargeNumbers(invalidStep)
    return validStep
  }

  private validateScaleQuantity(): number {
    const { max, min, step } = this.config;
    let { scaleQuantity} = this.config;

    if (typeof scaleQuantity !== 'number' || scaleQuantity < 2) {
      scaleQuantity = 2;
    }
    const quantitySteps = (max - min) / step + 1;
    
    if (quantitySteps < scaleQuantity) scaleQuantity = quantitySteps;
    scaleQuantity = Number(scaleQuantity.toFixed(0));
    return scaleQuantity
  }

  private updateButton(data: ViewHandleData): void {
    const { button, value } = data;
    const flagValue = this.calcFlagValue(data);
    if (!button.previousElementSibling) {
      this.emit('updateFirstButtonValue', flagValue);
      this.emit('updateFirstButtonPX', value);
    } else {
      this.emit('updateSecondButtonValue', flagValue);
      this.emit('updateSecondButtonPX', value);
    }
  }

  private calcDigitsAfterDot(): number {
    const { step } = this.config;
    const isDot = step.toString().includes('.');
    const digitsAfterDot = step.toString().split('.').pop()!.length;
    return isDot ? digitsAfterDot : 0;
  }

  private findNearestValue(value: number): number {
    const { max, min, step } = this.config;

    const steps: number[] = [];
    for (let i = min; i <= max; i += step) steps.push(i);

    let nearestValue: number | undefined = steps.find(
      (item, index, array) => {
        const halfStep = value + step / 2;

        return halfStep >= item && halfStep < array[index + 1];
      }
    );
    if (nearestValue === undefined) nearestValue = steps.pop()!;
    return nearestValue;
  }
}
export default Model;
