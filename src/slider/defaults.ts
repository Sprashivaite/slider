import { modelConfig, viewConfig } from './types';

const DEFAULT_MODEL_CONFIG: modelConfig = {
  firstValue: 0, 
  secondValue: 0,
  isRangeSlider: true,
  max: 100,
  min: 0,
  step: 1
};

const DEFAULT_VIEW_CONFIG: viewConfig = {
  target: undefined,
  isHorizontal: true,
  isRangeSlider: true,
  hasTooltip: true,
  hasProgressBar: true,
  hasScale: true,
};

const DEFAULT_CONFIG: viewConfig | modelConfig = {
  ...DEFAULT_MODEL_CONFIG,
  ...DEFAULT_VIEW_CONFIG,
};

export { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG, DEFAULT_CONFIG };
