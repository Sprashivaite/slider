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

const demarcateHandles = (view: View, event: string): void => {
  const { config, firstHandle, secondHandle, firstTooltip, secondTooltip } = view;
  const direction = config.isHorizontal ? 'left' : 'top';
  const offset = config.isHorizontal ? 'offsetLeft' : 'offsetTop';
  const firstHandleOffset = firstHandle.divElement[offset];
  const secondHandleOffset = secondHandle.divElement[offset];
  const isFirstGreater = (
    firstHandleOffset 
    >= secondHandleOffset 
    && event === 'updateFirstHandlePX'
  );
  const isSecondGreater = (
    secondHandleOffset 
    <= firstHandleOffset 
    && event === 'updateSecondHandlePX'
  );
  const firstTooltipValue = Number(firstTooltip.divElement.innerHTML);
  const secondTooltipValue = Number(secondTooltip.divElement.innerHTML);
  if (isFirstGreater) {
    firstHandle.divElement.style[direction] = `${secondHandleOffset}px`;
    firstHandle.divElement.classList.add('js-slider__handle_isTarget');
    secondHandle.divElement.classList.remove('js-slider__handle_isTarget');
    if (firstTooltipValue >= secondTooltipValue) {
      firstTooltip.divElement.innerHTML = secondTooltipValue;
    }
  }
  if (isSecondGreater) {
    secondHandle.divElement.style[direction] = `${firstHandleOffset}px`;
    firstHandle.divElement.classList.remove('js-slider__handle_isTarget');
    secondHandle.divElement.classList.add('js-slider__handle_isTarget');
    if (secondTooltipValue <= firstTooltipValue) {
      secondTooltip.divElement.innerHTML = firstTooltipValue;
    }
  }
};
export { assignTooltips, demarcateHandles };
