import IView from '../IView'

class ViewScale {
  div: HTMLDivElement;
  field: HTMLDivElement;
  isHorizontal: boolean;
  constructor(View: IView) {
    this.div = document.createElement("div");
    this.field = View.field.div;
    this.isHorizontal = View.isHorizontal;
  }
  createScale(quantity = 5): void {
    if (this.isHorizontal) this.div.className = "slider__scale_horizontal";
    if (!this.isHorizontal) this.div.className = "slider__scale_vertical";

    this.field.append(this.div);
    for (let i = 0; i < quantity; i++) {
      this.div.insertAdjacentHTML("beforeend", "<span>0</span>");
    }

    this.div.onmousedown = () => false;
  }
  updateValues(arrayVal: Array<number>): void {
    const scaleValues = this.div.children;
    arrayVal.forEach((item, index) => scaleValues[index].innerHTML = item + "")
  }
  hideScale(): void {
    this.div.classList.add("-js-slider__flag_hide");
  }
  showScale(): void {
    this.div.classList.remove("-js-slider__flag_hide");
  }
}

export default ViewScale;
