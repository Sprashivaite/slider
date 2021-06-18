import { ModelConfig, ViewConfig } from './types'

const DEFAULT_MODEL_CONFIG: ModelConfig = {
    max: 100,
    min: 0,
    step: 1,
    scaleQuantity: 11
}

const DEFAULT_VIEW_CONFIG: ViewConfig = {
    target: undefined,
    isHorizontal: true,
    isRangeSlider: true,
    isFlag: true,
    isProgressBar: true,
    isScale: true,
    
}

const DEFAULT_CONFIG: ViewConfig | ModelConfig = {
    ...DEFAULT_MODEL_CONFIG,
    ...DEFAULT_VIEW_CONFIG
}

export { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG, DEFAULT_CONFIG }