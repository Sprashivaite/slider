import View from '../View';

const assignTooltips = (view: View): void => {
  const { config, firstTooltip, secondTooltip, tooltipTotal } = view;
  const unValid = !secondTooltip || !config.isTooltip || !config.isRangeSlider;
  if (unValid) return;
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

const demarcateButtons = (view: View, event: string): void => {
  const { config, firstButton, secondButton, firstTooltip, secondTooltip } = view;
  const direction = config.isHorizontal ? 'left' : 'top';
  const offset = config.isHorizontal ? 'offsetLeft' : 'offsetTop';
  const firstButtonOffset = firstButton.div[offset];
  const secondButtonOffset = secondButton.div[offset];
  const isFirstGreater = (
    firstButtonOffset 
    >= secondButtonOffset 
    && event === 'updateFirstButtonPX'
  );
  const isSecondGreater = (
    secondButtonOffset 
    <= firstButtonOffset 
    && event === 'updateSecondButtonPX'
  );
  const firstTooltipValue = Number(firstTooltip.div.innerHTML);
  const secondTooltipValue = Number(secondTooltip.div.innerHTML);
  if (isFirstGreater) {
    firstButton.div.style[direction] = `${secondButtonOffset}px`;
    firstButton.div.classList.add('js-slider__button_isTarget');
    secondButton.div.classList.remove('js-slider__button_isTarget');
    if (firstTooltipValue >= secondTooltipValue) {
      firstTooltip.div.innerHTML = secondTooltipValue;
    }
  }
  if (isSecondGreater) {
    secondButton.div.style[direction] = `${firstButtonOffset}px`;
    firstButton.div.classList.remove('js-slider__button_isTarget');
    secondButton.div.classList.add('js-slider__button_isTarget');
    if (secondTooltipValue <= firstTooltipValue) {
      secondTooltip.div.innerHTML = firstTooltipValue;
    }
  }
};
export { assignTooltips, demarcateButtons };
