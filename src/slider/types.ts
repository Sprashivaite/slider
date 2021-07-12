import ViewPoint from "./View/subView/ViewPoint";

type ModelConfig = {
  firstValue: number;
  secondValue: number;
  isRange: boolean;
  max: number;
  min: number;
  step: number;
};

type ViewConfig = {
  target?: HTMLElement;
  isHorizontal: boolean;
  isRange: boolean;
  hasTooltip: boolean;
  hasScale: boolean;
  hasProgressBar: boolean;
};

type ViewElements = {
  slider?: HTMLElement;
  field?: HTMLElement;
  firstPoint?: HTMLElement;
  secondPoint?: HTMLElement;
  root?: HTMLElement;
};

type UserConfig = {  
  firstValue?: number;
  secondValue?: number;
  max?: number;
  min?: number;
  step?: number;
  target?: HTMLElement;
  isHorizontal?: boolean;
  isRange?: boolean;
  hasTooltip?: boolean;
  hasScale?: boolean;
  hasProgressBar?: boolean;  
};

type ProgressBar = {
  root: HTMLElement,
  firstPoint: ViewPoint,
  secondPoint?: ViewPoint
}

enum EventTypes {
  valueChanged = 'valueChanged',
  pointStopped = 'pointStopped',
  pointMoving = 'pointMoving',
  stepsUpdate = 'stepsUpdate',
  updatePoint = 'updatePoint',
  configChanged = 'configChanged',
  elementsRendered = 'elementsRendered',
}

enum PointNames {
  firstPoint = 'firstPoint',
  secondPoint = 'secondPoint'
}

type EventName = keyof typeof EventTypes;
type PointName = keyof typeof PointNames;
type EventCallback = (data: any) => void 

type PointData = {
  pointOffset: number;
  pointName: PointName;
  value?: number;
};

type PointValue = {
  pointName: PointName;
  value: number;
};

export { 
  ModelConfig,
  UserConfig,
  ViewConfig,
  PointData,
  PointValue,
  ProgressBar,
  EventTypes,
  ViewElements,
  EventName,
  EventCallback
};
