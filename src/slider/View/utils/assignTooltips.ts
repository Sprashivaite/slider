import View from '../View';

const assignTooltips = (view: View): void => {
  const { config, firstPoint, secondPoint, tooltipTotal } = view;
  const invalid = !config.hasTooltip || !config.isRangeSlider;
  if (invalid) return;
  const firstOffset = config.isHorizontal ? 'right' : 'bottom';
  const secondOffset = config.isHorizontal ? 'left' : 'top';
  const delimiter = config.isHorizontal ? ' - ' : ' ';
  const firstTooltipOffset = firstPoint.tooltip.divElement.getBoundingClientRect()[firstOffset];
  const secondTooltipOffset = secondPoint.tooltip.divElement.getBoundingClientRect()[secondOffset];
  const tooltipTotalOffset = `${(secondTooltipOffset - firstTooltipOffset) / 2}px`;
  tooltipTotal.divElement.style[secondOffset] = tooltipTotalOffset;
  const text = `${firstPoint.tooltip.divElement.innerHTML}${delimiter}${secondPoint.tooltip.divElement.innerHTML}`;
  tooltipTotal.divElement.innerHTML = text;
  if (firstTooltipOffset >= secondTooltipOffset) {
    [firstPoint.tooltip, secondPoint.tooltip].forEach((tooltip) => tooltip.hideTooltip());
    tooltipTotal.divElement.style.visibility = 'visible'
  } else {
    [firstPoint.tooltip, secondPoint.tooltip].forEach((tooltip) => tooltip.showTooltip());
    tooltipTotal.divElement.style.visibility = 'hidden'
  }
};

export default assignTooltips;
