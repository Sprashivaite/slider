import ViewPoint from "./View/subView/ViewPoint";

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
  hasTooltip: boolean;
  hasScale: boolean;
  hasProgressBar: boolean;
};

type viewElements = {
  slider?: HTMLElement;
  field?: HTMLElement;
  firstPoint?: HTMLElement;
  secondPoint?: HTMLElement;
  root?: HTMLElement;
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
  hasTooltip?: boolean;
  hasScale?: boolean;
  hasProgressBar?: boolean;  
};

type pointData = {
  pointOffset: number;
  pointName: string;
  value?: number;
};

type pointValue = {
  pointName: string;
  value: number;
};

type progressBar = {
  root: HTMLElement,
  firstPoint: ViewPoint,
  secondPoint?: ViewPoint
}

enum eventTypes {
  valueChanged = 'valueChanged',
  pointStopped = 'pointStopped',
  pointMoving = 'pointMoving',
  stepsUpdate = 'stepsUpdate',
  updatePoint = 'updatePoint',
  configChanged = 'configChanged',
  elementsRendered = 'elementsRendered',
}

type eventName = keyof typeof eventTypes;
type eventCallback = (data: any) => void 

export { 
  modelConfig,
  userConfig,
  viewConfig,
  pointData,
  pointValue,
  progressBar,
  eventTypes,
  viewElements,
  eventName,
  eventCallback
};
