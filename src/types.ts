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
export {ViewHandleData, scaleData, elementsSize }