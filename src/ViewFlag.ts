import View from "./View";

class Flag {
  div: HTMLDivElement;
  button: HTMLDivElement;
  constructor(button: HTMLDivElement) {
    this.div = document.createElement("div");
    this.button = button;
  }
  createFlag(): void {
    this.div.className = "slider__flag";
    this.div.style.top = "-17px";
    this.div.innerHTML = '0';
    this.button.append(this.div);
  }
  changeFlagValue(value: number): void {
    this.div.innerHTML = value + "";
  }
  hideFlag(): void {
    this.div.classList.add('-js-slider__flag_hide');
  }
  showFlag(): void {
    this.div.classList.remove('-js-slider__flag_hide');
  }
}
export default Flag