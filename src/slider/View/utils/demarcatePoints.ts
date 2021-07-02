import View from '../View';

const demarcatePoints = (view: View, pointName: string): void => {
  const { config, firstPoint, secondPoint } = view;
  if (!config.isRangeSlider) return;
  if (firstPoint.getPointOffset() <= secondPoint.getPointOffset()) return;
  if (pointName === 'secondPoint') {
    secondPoint.movePoint(firstPoint.getPointOffset());
    secondPoint.divElement.classList.add('js-slider__point_target');
    firstPoint.divElement.classList.remove('js-slider__point_target');
  } else {
    firstPoint.movePoint(secondPoint.getPointOffset());
    firstPoint.divElement.classList.add('js-slider__point_target');
    secondPoint.divElement.classList.remove('js-slider__point_target');
  }
};
export default demarcatePoints;
