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
  isTooltip?: boolean;
  isScale?: boolean;
  isProgressBar?: boolean;  
};

type pointData = {
  pointOffset: number;
  pointName: string;
  value?: number;
};

enum eventTypes {
  valueChanged = 'valueChanged',
  pointStopped = 'pointStopped',
  pointMoving = 'pointMoving',
  stepsUpdate = 'stepsUpdate',
  updatePoint = 'updatePoint',
  elementsRendered = 'elementsRendered'
}

type eventName = keyof typeof eventTypes;
type eventCallback = (data: any) => void 

export { 
  modelConfig,
  userConfig,
  viewConfig,
  pointData,
  eventTypes,
  viewElements,
  eventName,
  eventCallback
};
