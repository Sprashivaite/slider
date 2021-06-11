import IView from '../IView'
import {scaleValues } from '../../types'

class ViewScale {
  div!: HTMLDivElement;

  slider!: HTMLElement;

  isHorizontal!: boolean;

  scaleOffsets!: number[];

  constructor(View: IView) {    
    this.init(View)
  }

  createScale(quantity = 2): void {    
    if (this.isHorizontal) this.div.className = "js-slider__scale_horizontal";
    if (!this.isHorizontal) this.div.className = "js-slider__scale_vertical";    
    this.slider.append(this.div);
    
    let thisQuantity = quantity;
    if(thisQuantity > 11) thisQuantity = 11;

    for (let i = 0; i < thisQuantity; i += 1) {
      this.div.insertAdjacentHTML("beforeend", "<div></div>");
    }
  }

  updateValues(data: scaleValues): void {
    const {arrValues, quantity} = data    
    this.div.innerHTML = '' 
    for (let i = 0; i < quantity; i += 1) {
      this.div.insertAdjacentHTML("beforeend", "<div></div>");
    }
    const scaleChildren = this.div.children;
    this.calcScaleOffsets(data)
    arrValues.forEach((item, index) => {
      scaleChildren[index].innerHTML = `${item}`
      if (this.isHorizontal) scaleChildren[index].style.left = `${this.scaleOffsets[index]}%`
      if(!this.isHorizontal) scaleChildren[index].style.top = `${this.scaleOffsets[index]}%`
    })
  }
  

  hideScale(): void {
    this.div.classList.add("-js-slider__flag_hide");
  }

  showScale(): void {
    this.div.classList.remove("-js-slider__flag_hide");
  }
  
  private init(View: IView) {
    this.div = document.createElement("div");
    this.slider = View.slider.div;
    this.isHorizontal = View.config.isHorizontal!;
  }

  private calcScaleOffsets(data: scaleValues): void {
    const {arrValues } = data 
    const firstValue = arrValues[0]
    const lastValue = arrValues[arrValues.length - 1]    
    this.scaleOffsets = []    
    const step = 100 / (lastValue - firstValue)  

    arrValues.forEach(value => {
      const moduleValue = value - firstValue
      this.scaleOffsets.push(moduleValue * step)      
    })
  }
}

export default ViewScale;
