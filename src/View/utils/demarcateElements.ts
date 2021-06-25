import View from '../View';

const assignFlags = (view: View): void => {
  const { config, firstFlag, secondFlag, flagTotal } = view;
  const unValid = !secondFlag || !config.isFlag || !config.isRangeSlider;
  if (unValid) return;
  const firstOffset = config.isHorizontal ? 'right' : 'bottom';
  const secondOffset = config.isHorizontal ? 'left' : 'top';
  const delimiter = config.isHorizontal ? ' - ' : ' ';
  const firstFlagOffset = firstFlag.div.getBoundingClientRect()[firstOffset];
  const secondFlagOffset = secondFlag.div.getBoundingClientRect()[secondOffset];
  const flagTotalOffset = `${(secondFlagOffset - firstFlagOffset) / 2}px`;
  flagTotal.div.style[secondOffset] = flagTotalOffset;
  const text = `${firstFlag.div.innerHTML}${delimiter}${secondFlag.div.innerHTML}`;
  flagTotal.div.innerHTML = text;
  if (firstFlagOffset >= secondFlagOffset) {
    [firstFlag, secondFlag].forEach((flag) => flag.hideFlag());
    flagTotal.showFlag();
  } else {
    [firstFlag, secondFlag].forEach((flag) => flag.showFlag());
    flagTotal.hideFlag();
  }
};

const demarcateButtons = (view: View, event: string): void => {
  const { config, firstButton, secondButton, firstFlag, secondFlag } = view;
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
  const firstFlagValue = Number(firstFlag.div.innerHTML);
  const secondFlagValue = Number(secondFlag.div.innerHTML);
  if (isFirstGreater) {
    firstButton.div.style[direction] = `${secondButtonOffset}px`;
    firstButton.div.classList.add('js-slider__button_isTarget');
    secondButton.div.classList.remove('js-slider__button_isTarget');
    if (firstFlagValue >= secondFlagValue) {
      firstFlag.div.innerHTML = secondFlagValue;
    }
  }
  if (isSecondGreater) {
    secondButton.div.style[direction] = `${firstButtonOffset}px`;
    firstButton.div.classList.remove('js-slider__button_isTarget');
    secondButton.div.classList.add('js-slider__button_isTarget');
    if (secondFlagValue <= firstFlagValue) {
      secondFlag.div.innerHTML = firstFlagValue;
    }
  }
};
export { assignFlags, demarcateButtons };
