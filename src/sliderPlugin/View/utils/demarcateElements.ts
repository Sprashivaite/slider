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

export default assignTooltips;
