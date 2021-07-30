import ViewContainer from './View/subView/ViewContainer/ViewContainer';
import ViewField from './View/subView/ViewField/ViewField';
import ViewPoint from './View/subView/ViewPoint/ViewPoint';
import ViewProgressBar from './View/subView/ViewProgressBar/ViewProgressBar';
import ViewScale from './View/subView/ViewScale/ViewScale';
import ViewTooltip from './View/subView/ViewTooltip/ViewTooltip';

type ModelConfig = {
  firstValue: number;
  secondValue: number;
  isRange: boolean;
  max: number;
  min: number;
  step: number;
};

type ViewConfig = {
  target?: HTMLDivElement;
  isHorizontal: boolean;
  isRange: boolean;
  hasTooltip: boolean;
  hasScale: boolean;
  hasProgressBar: boolean;
};

type UserConfig = {
  firstValue?: number;
  secondValue?: number;
  max?: number;
  min?: number;
  step?: number;
  target?: HTMLDivElement;
  isHorizontal?: boolean;
  isRange?: boolean;
  hasTooltip?: boolean;
  hasScale?: boolean;
  hasProgressBar?: boolean;
};

type SubViews = {
  slider: ViewContainer;
  firstPoint: ViewPoint;
  secondPoint?: ViewPoint;
  field: ViewField;
  progressBar: ViewProgressBar;
  scale: ViewScale;
  tooltipTotal?: ViewTooltip;
};

type ProgressBar = {
  root: HTMLDivElement;
  firstPoint: ViewPoint;
  secondPoint?: ViewPoint;
};

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
  secondPoint = 'secondPoint',
}

type EventName = keyof typeof EventTypes;
type PointName = keyof typeof PointNames;
type EventCallback<A, B> = (data: A) => B;

type PointData = {
  pointOffset: number;
  pointName: PointName;
  value?: number;
  steps?: number[];
};

export {
  ModelConfig,
  UserConfig,
  ViewConfig,
  SubViews,
  PointData,
  ProgressBar,
  EventTypes,
  EventName,
  EventCallback,
};
