import View from '../View';

const assignTooltips = (view: View): void => {
  const { config, firstTooltip, secondTooltip, tooltipTotal } = view;
  const invalid = !secondTooltip || !config.isTooltip || !config.isRangeSlider;
  if (invalid) return;
  const firstOffset = config.isHorizontal ? 'right' : 'bottom';
  const secondOffset = config.isHorizontal ? 'left' : 'top';
  const delimiter = config.isHorizontal ? ' - ' : ' ';
  const firstTooltipOffset = firstTooltip.div.getBoundingClientRect()[firstOffset];
  const secondTooltipOffset = secondTooltip.div.getBoundingClientRect()[secondOffset];
  const tooltipTotalOffset = `${(secondTooltipOffset - firstTooltipOffset) / 2}px`;
  tooltipTotal.div.style[secondOffset] = tooltipTotalOffset;
  const text = `${firstTooltip.div.innerHTML}${delimiter}${secondTooltip.div.innerHTML}`;
  tooltipTotal.div.innerHTML = text;
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
  const firstHandleOffset = firstHandle.div[offset];
  const secondHandleOffset = secondHandle.div[offset];
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
  const firstTooltipValue = Number(firstTooltip.div.innerHTML);
  const secondTooltipValue = Number(secondTooltip.div.innerHTML);
  if (isFirstGreater) {
    firstHandle.div.style[direction] = `${secondHandleOffset}px`;
    firstHandle.div.classList.add('js-slider__handle_isTarget');
    secondHandle.div.classList.remove('js-slider__handle_isTarget');
    if (firstTooltipValue >= secondTooltipValue) {
      firstTooltip.div.innerHTML = secondTooltipValue;
    }
  }
  if (isSecondGreater) {
    secondHandle.div.style[direction] = `${firstHandleOffset}px`;
    firstHandle.div.classList.remove('js-slider__handle_isTarget');
    secondHandle.div.classList.add('js-slider__handle_isTarget');
    if (secondTooltipValue <= firstTooltipValue) {
      secondTooltip.div.innerHTML = firstTooltipValue;
    }
  }
};
export { assignTooltips, demarcateHandles };
