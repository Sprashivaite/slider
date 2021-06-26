type modelConfig = {
  max: number;
  min: number;
  step: number;
};

type userModelConfig = {
  max?: number;
  min?: number;
  step?: number;
};

type viewConfig = {
  target?: HTMLElement;
  isHorizontal: boolean;
  isRangeSlider: boolean;
  isTooltip: boolean;
  isScale: boolean;
  isProgressBar: boolean;
};

type userViewConfig = {
  target?: HTMLElement;
  isHorizontal?: boolean;
  isRangeSlider?: boolean;
  isTooltip?: boolean;
  isScale?: boolean;
  isProgressBar?: boolean;
};

type viewHandleData = {
  button: HTMLElement;
  buttonOffset: number;
  mouseCoords: number;
  buttonName: string;
  value?: number;
};

type elementsData = {
  button: HTMLElement;
  buttonOffset: number;
  mouseCoords: number;
  value: number;
  buttonName: string;
};

type elementsSize = {
  fieldSize: number;
  buttonSize: number;
};

type scaleData = {
  scaleValues: number[];
  quantity: number;
};

export { 
  modelConfig,
  userModelConfig,
  viewConfig,
  viewHandleData,
  scaleData,
  elementsSize,
  elementsData,
  userViewConfig 
};
