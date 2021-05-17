import IView from "../IView";

class Flag {
  div!: HTMLDivElement;

  button!: HTMLDivElement;

  field!: any;

  isHorizontal!: any;

  constructor(View: IView) {    
    this.init(View)    
  }

  createFlag(): void {
    this.div = document.createElement("div");
    this.div.className = "slider__flag";
    this.div.innerHTML = "0";
    this.field.append(this.div);
    this.moveFlag(0)
  }

  changeFlagValue(value: number): void {
    this.div.innerHTML = `${value}`;
  }

  moveFlag(value: number): void {
    const flagWidth = (this.div.offsetWidth - this.button.offsetWidth) / 2
    if(this.isHorizontal) {
    this.div.style.left = `${value - flagWidth}px`;
    }
    if(!this.isHorizontal) {
      this.div.style.left = `22px`;
      this.div.style.top = `${value}px`;
    }
  }

  demarcateFromSiblingFlag(flag1: HTMLElement, flag2: HTMLElement): void {
    if(!flag1 && !flag2) return
    const flagSize1: number = flag1.offsetWidth;
    const flagOffset1: number = flag1.getBoundingClientRect().left + flagSize1;
    const flagOffset2: number = flag2.getBoundingClientRect().left; 
    if (flagOffset1 >= flagOffset2) {
      flag2.style.left = `${flagOffset1 - this.field.getBoundingClientRect().left + 1}px`;
    }
  }

  hideFlag(): void {
    this.div.classList.add("-js-slider__flag_hide");
  }

  showFlag(): void {
    this.div.classList.remove("-js-slider__flag_hide");
  }

  private init(View: IView): void { 
    this.button = View.button1.div;
    this.field = View.field.div;
    this.isHorizontal = View.isHorizontal
  } 
}
export default Flag;
