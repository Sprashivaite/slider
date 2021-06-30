import View from '../View';

const isFirstPointClosest = (view: View, event: MouseEvent): boolean => {
    const { config, firstPoint, secondPoint, mouseCoords } = view
    if (!config.isRangeSlider) return true;
    if (event.target === firstPoint.divElement) return true;
    if (event.target === secondPoint.divElement) return false;
    const firstPointOffset = firstPoint.getPointOffset();
    const secondPointOffset = secondPoint.getPointOffset();
    const betweenPoints = (secondPointOffset + firstPointOffset) / 2;
    const isPointClose = mouseCoords > betweenPoints;
    if (isPointClose) return false;
    return true;
}
export default isFirstPointClosest