import { modelConfig, viewConfig } from './types';

const DEFAULT_MODEL_CONFIG: modelConfig = {
  max: 100,
  min: 0,
  step: 1
};

const DEFAULT_VIEW_CONFIG: viewConfig = {
  isHorizontal: true,
  isRangeSlider: true,
  isTooltip: true,
  isProgressBar: true,
  isScale: true,
};

const DEFAULT_CONFIG: viewConfig | modelConfig = {
  ...DEFAULT_MODEL_CONFIG,
  ...DEFAULT_VIEW_CONFIG,
};

export { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG, DEFAULT_CONFIG };
