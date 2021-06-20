import View from "../View";

const assignFlags = (view: View): void => {
    const { config, firstFlag, secondFlag, flagTotal } = view
    const unValid =
        !secondFlag || !config.isFlag || !config.isRangeSlider;
    if (unValid) return;
    let firstFlagOffset = firstFlag.div.getBoundingClientRect().right;
    let secondFlagOffset = secondFlag.div.getBoundingClientRect().left;
    if (!config.isHorizontal) {
        firstFlagOffset = firstFlag.div.getBoundingClientRect().bottom;
        secondFlagOffset = secondFlag.div.getBoundingClientRect().top;
    }

    const text = `${firstFlag.div.innerHTML} - ${secondFlag.div.innerHTML}`;
    if (firstFlagOffset >= secondFlagOffset) {
        [firstFlag, secondFlag].forEach(flag => flag.hideFlag())        
        flagTotal.showFlag();
        flagTotal.div.innerHTML = text;
        const flagTotalOffset = `${(secondFlagOffset - firstFlagOffset) / 2}px`;
        flagTotal.div.style.left = flagTotalOffset;
        if (!config.isHorizontal) flagTotal.div.style.left = '150%';
    } else {
        [firstFlag, secondFlag].forEach(flag => flag.showFlag())
        flagTotal.hideFlag();
    }
}
export default assignFlags;
