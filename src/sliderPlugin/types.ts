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
  handle: HTMLElement;
  handleOffset: number;
  mouseCoords: number;
  handleName: string;
  value?: number;
};

type elementsData = {
  handle: HTMLElement;
  handleOffset: number;
  mouseCoords: number;
  value: number;
  handleName: string;
};

type elementsSize = {
  fieldSize: number;
  handleSize: number;
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