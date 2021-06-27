import View from '../View';

const assignTooltips = (view: View): void => {
  const { config, firstTooltip, secondTooltip, tooltipTotal } = view;
  const invalid = !secondTooltip || !config.isTooltip || !config.isRangeSlider;
  if (invalid) return;
  const firstOffset = config.isHorizontal ? 'right' : 'bottom';
  const secondOffset = config.isHorizontal ? 'left' : 'top';
  const delimiter = config.isHorizontal ? ' - ' : ' ';
  const firstTooltipOffset = firstTooltip.divElement.getBoundingClientRect()[firstOffset];
  const secondTooltipOffset = secondTooltip.divElement.getBoundingClientRect()[secondOffset];
  const tooltipTotalOffset = `${(secondTooltipOffset - firstTooltipOffset) / 2}px`;
  tooltipTotal.divElement.style[secondOffset] = tooltipTotalOffset;
  const text = `${firstTooltip.divElement.innerHTML}${delimiter}${secondTooltip.divElement.innerHTML}`;
  tooltipTotal.divElement.innerHTML = text;
  if (firstTooltipOffset >= secondTooltipOffset) {
    [firstTooltip, secondTooltip].forEach((tooltip) => tooltip.hideTooltip());
    tooltipTotal.showTooltip();
  } else {
    [firstTooltip, secondTooltip].forEach((tooltip) => tooltip.showTooltip());
    tooltipTotal.hideTooltip();
  }
};

const demarcatePoints = (view: View, event: string): void => {
  const { config, firstPoint, secondPoint, firstTooltip, secondTooltip } = view;
  const direction = config.isHorizontal ? 'left' : 'top';
  const offset = config.isHorizontal ? 'offsetLeft' : 'offsetTop';
  const firstPointOffset = firstPoint.divElement[offset];
  const secondPointOffset = secondPoint.divElement[offset];
  const isFirstGreater = (
    firstPointOffset 
    >= secondPointOffset 
    && event === 'updateFirstPointPX'
  );
  const isSecondGreater = (
    secondPointOffset 
    <= firstPointOffset 
    && event === 'updateSecondPointPX'
  );
  const firstTooltipValue = Number(firstTooltip.divElement.innerHTML);
  const secondTooltipValue = Number(secondTooltip.divElement.innerHTML);
  if (isFirstGreater) {
    firstPoint.divElement.style[direction] = `${secondPointOffset}px`;
    firstPoint.divElement.classList.add('js-slider__point_isTarget');
    secondPoint.divElement.classList.remove('js-slider__point_isTarget');
    if (firstTooltipValue >= secondTooltipValue) {
      firstTooltip.divElement.innerHTML = secondTooltipValue;
    }
  }
  if (isSecondGreater) {
    secondPoint.divElement.style[direction] = `${firstPointOffset}px`;
    firstPoint.divElement.classList.remove('js-slider__point_isTarget');
    secondPoint.divElement.classList.add('js-slider__point_isTarget');
    if (secondTooltipValue <= firstTooltipValue) {
      secondTooltip.divElement.innerHTML = firstTooltipValue;
    }
  }
};
export { assignTooltips, demarcatePoints };
