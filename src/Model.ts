class Model {
  max: number;
  min: number;
  private _step: number;
  private _isHorizontal: boolean;
  constructor() {  this.max = 100;
    this.min = 0;
    this._step = 1;
    this._isHorizontal = true;
  }

  get isHorizontal(): boolean {
    return this._isHorizontal;
  }
  set isHorizontal(boolean) {
    if (typeof boolean === "boolean") this._isHorizontal = boolean;
  }
  get step(): number {
    return this._step;
  }
  set step(value) {
    if (value === 0) {
      value = 1;
    }
    this._step = Math.abs(value);
  }

  calcBtnOffset(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number
  ): number {
    let fieldWidth: number = field.offsetWidth;
    let buttonWidth: number = button.offsetWidth;

    let shiftLeft: number =
      mouseCoords - field.getBoundingClientRect().left - buttonWidth / 2;

    if (!this.isHorizontal) {
      shiftLeft =
        mouseCoords - field.getBoundingClientRect().top - buttonWidth / 2;
      fieldWidth = field.offsetHeight;
    }

    if(button.nextElementSibling.getAttribute('class') === 'slider__button'){
      if(shiftLeft >= button.nextElementSibling.offsetLeft - buttonWidth){
      return button.nextElementSibling.offsetLeft - buttonWidth;}
    }
    else if (shiftLeft >= fieldWidth - buttonWidth) {
      return fieldWidth - buttonWidth;
    }



    if(button.previousElementSibling){
      if(button.previousElementSibling.getAttribute('class') === 'slider__button' && shiftLeft <= button.previousElementSibling.offsetLeft + buttonWidth){
      return button.previousElementSibling.offsetLeft + buttonWidth;}
    }
    else if (shiftLeft <= 0) {
      return 0;
    }

    
    return shiftLeft;
  }

  moveToValue(field: HTMLElement, button: HTMLElement, value: number): void {
    let fieldWidth: number = field.offsetWidth;
    let buttonWidth: number = button.offsetWidth;

    if (!this.isHorizontal) {
      fieldWidth = field.offsetHeight;
    }

    let result: string =
      ((fieldWidth - buttonWidth) / (this.max - this.min)) *
        (value - this.min) +
      "px";

    this.isHorizontal
      ? (button.style.left = result)
      : (button.style.top = result);
  }

  calcValue(field: HTMLElement, button: HTMLElement): number {
    let buttonOffset: number = button.offsetLeft;
    let buttonWidth: number = button.offsetWidth;
    let fieldWidth: number = field.offsetWidth;

    if (!this.isHorizontal) {
      fieldWidth = field.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    let fieldRange: number = fieldWidth - buttonWidth;

    let result: number =
      this.min +
      Math.trunc((buttonOffset * (this.max - this.min)) / fieldRange);

    let countStep: number = this.min;

    while (result > countStep + this.step / 2) {
      countStep += this.step;
      if (countStep > this.max) {
        return (countStep -= this.step);
      }
    }

    return +countStep.toFixed(1);
  }

  makeBreakPoint(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number
  ): number {
    let that = this;
    let fieldWidth: number;
    this.isHorizontal
      ? (fieldWidth = field.offsetWidth)
      : (fieldWidth = field.offsetHeight);

    let stepPX: number =
      ((fieldWidth - button.offsetWidth) * this.step) / (this.max - this.min);

    let arr: number[] = [];
    for (let i = 0; i <= fieldWidth - button.offsetWidth; i += stepPX) {
      arr.push(i);
    }
    
    let val: number = 0;
    arr.forEach(function (item, index, array) {
      if (
        that.calcBtnOffset(field, button, mouseCoords) >= item &&
        that.calcBtnOffset(field, button, mouseCoords) <=
          array[index + 1] - stepPX / 2
      ) {
        val = item;
      } else if (
        that.calcBtnOffset(field, button, mouseCoords) >= item + stepPX / 2 &&
        that.calcBtnOffset(field, button, mouseCoords) <= array[index + 1]
      ) {
        val = array[index + 1];
      }
    });
    return val;
  }
}
export {Model}