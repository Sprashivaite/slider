import IModelConfig from './Model/IModelConfig'
import IViewConfig from './View/IViewConfig'

const DEFAULT_MODEL_CONFIG: IModelConfig = {
    max: 100,
    min: 0,
    step: 1,
    isHorizontal: true,
}

const DEFAULT_VIEW_CONFIG: IViewConfig = {
    target: undefined,
    isHorizontal: true,
    isRangeSlider: true,
    isFlag: true,
    isProgressBar: true,
    isScale: true,
    scaleQuantity: 6,
}

const DEFAULT_CONFIG: IViewConfig | IModelConfig = {
    ...DEFAULT_MODEL_CONFIG,
    ...DEFAULT_VIEW_CONFIG
}

export { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG, DEFAULT_CONFIG }