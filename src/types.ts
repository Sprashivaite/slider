type modelConfig = {
  max: number;
  min: number;
  step: number;
  scaleQuantity: number;
};

type userModelConfig = {
  max?: number;
  min?: number;
  step?: number;
  scaleQuantity?: number;
};

type viewConfig = {
  target?: HTMLElement;
  isHorizontal?: boolean;
  isRangeSlider?: boolean;
  isFlag?: boolean;
  isScale?: boolean;
  isProgressBar?: boolean;
};

type viewHandleData = {
  button: HTMLElement;
  buttonOffset: number;
  mouseCoords: number;
  value: number;
};

type elementsSize = {
  fieldSize: number;
  buttonSize: number;
};

type scaleData = {
  scaleValues: number[];
  quantity: number;
};

export { modelConfig, userModelConfig, viewConfig, viewHandleData, scaleData, elementsSize };
