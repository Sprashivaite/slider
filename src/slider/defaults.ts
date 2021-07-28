import { ModelConfig, ViewConfig } from './types';

const DEFAULT_MODEL_CONFIG: ModelConfig = {
  firstValue: 0,
  secondValue: 0,
  isRange: true,
  max: 100,
  min: 0,
  step: 1,
};

const DEFAULT_VIEW_CONFIG: ViewConfig = {
  target: undefined,
  isHorizontal: true,
  isRange: true,
  hasTooltip: true,
  hasProgressBar: true,
  hasScale: true,
};

const DEFAULT_CONFIG: ViewConfig | ModelConfig = {
  ...DEFAULT_MODEL_CONFIG,
  ...DEFAULT_VIEW_CONFIG,
};

export { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG, DEFAULT_CONFIG };
