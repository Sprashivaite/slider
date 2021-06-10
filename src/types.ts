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

type scaleValues = {
    arrValues: number[];
    quantity: number;
}
export {ViewHandleData, scaleValues, elementsSize }