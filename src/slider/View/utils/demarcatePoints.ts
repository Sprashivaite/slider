import View from '../View';

const demarcatePoints = (view: View, pointName: string): void => {
    const { config, firstPoint, secondPoint } = view
    if (!config.isRangeSlider) return
    if(firstPoint.getPointOffset() <= secondPoint.getPointOffset()) return
    if(pointName === 'secondPoint') {
      secondPoint.movePoint(firstPoint.getPointOffset());
      secondPoint.divElement.classList.add('js-slider__point_isTarget')
      firstPoint.divElement.classList.remove('js-slider__point_isTarget')
    } else {
      firstPoint.movePoint(secondPoint.getPointOffset());
      firstPoint.divElement.classList.add('js-slider__point_isTarget')
      secondPoint.divElement.classList.remove('js-slider__point_isTarget')
    }    
  }
  export default demarcatePoints