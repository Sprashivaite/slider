import ViewPoint from "./View/subView/ViewPoint";

type modelConfig = {
  max: number;
  min: number;
  step: number;
};

type viewConfig = {
  target?: HTMLElement;
  isHorizontal: boolean;
  isRangeSlider: boolean;
  isTooltip: boolean;
  isScale: boolean;
  isProgressBar: boolean;
};

type userConfig = {  
  max?: number;
  min?: number;
  step?: number;
  target?: HTMLElement;
  isHorizontal?: boolean;
  isRangeSlider?: boolean;
  isTooltip?: boolean;
  isScale?: boolean;
  isProgressBar?: boolean;  
};

type pointData = {
  point: ViewPoint;
  pointOffset: number;
  pointName: string;
  value?: number;
};

export { 
  modelConfig,
  userConfig,
  viewConfig,
  pointData
};
