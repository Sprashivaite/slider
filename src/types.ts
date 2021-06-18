type ModelConfig = {
    max: number;
    min: number;
    step: number;    
    scaleQuantity: number;
}

type ViewConfig = {
    target?: HTMLElement;
    isHorizontal?: boolean;
    isRangeSlider?: boolean;
    isFlag?: boolean;
    isScale?: boolean;
    isProgressBar?: boolean;
}

type ViewHandleData = {
    button: HTMLElement;
    buttonOffset: number;
    mouseCoords: number;
    value?: number;
}
type elementsSize = {
    fieldSize: number;
    buttonSize: number;
}

type scaleData = {
    scaleValues: number[];
    quantity: number;
}
export { ModelConfig, ViewConfig, ViewHandleData, scaleData, elementsSize }