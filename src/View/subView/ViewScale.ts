class ViewScale {
  div: HTMLDivElement;
  field: HTMLDivElement;
  isHorizontal: boolean;
  constructor(field: HTMLDivElement, isHorizontal: boolean) {
    this.div = document.createElement("div");
    this.field = field;
    this.isHorizontal = isHorizontal;
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
  updateValues(arrayVal: Array<number>) {
    let spans = this.div.children;
    for (let i = 0; i < spans.length; i++) {
      spans[i].innerHTML = arrayVal[i] + "";
    }
  }
  hideScale(): void {
    this.div.classList.add("-js-slider__flag_hide");
  }
  showScale(): void {
    this.div.classList.remove("-js-slider__flag_hide");
  }
}

export default ViewScale;
