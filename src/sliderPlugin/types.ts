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

type viewPointData = {
  point: HTMLElement;
  pointOffset: number;
  mouseCoords: number;
  pointName: string;
  value?: number;
};

type elementsData = {
  point: HTMLElement;
  pointOffset: number;
  mouseCoords: number;
  value: number;
  pointName: string;
};

type elementsSize = {
  fieldSize: number;
  pointSize: number;
};

type scaleData = {
  scaleValues: number[];
  quantity: number;
};

export { 
  modelConfig,
  userModelConfig,
  viewConfig,
  viewPointData,
  scaleData,
  elementsSize,
  elementsData,
  userViewConfig 
};
