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
  const text = `${firstFlag.div.innerHTML}${delimiter}${secondFlag.div.innerHTML}`;
  const flagTotalOffset = `${(secondFlagOffset - firstFlagOffset) / 2}px`;  
  flagTotal.div.innerHTML = text;
  flagTotal.div.style[secondOffset] = flagTotalOffset;
  
  if (firstFlagOffset >= secondFlagOffset) {
    [firstFlag, secondFlag].forEach((flag) => flag.hideFlag());
    flagTotal.showFlag();
  } else {
    [firstFlag, secondFlag].forEach((flag) => flag.showFlag());
    flagTotal.hideFlag();
  }
};
export default assignFlags;
