// import ViewPoint from "./View/subView/ViewPoint";

type modelConfig = {
  firstValue: number;
  secondValue: number;
  isRangeSlider: boolean;
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
  firstValue?: number;
  secondValue?: number;
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
