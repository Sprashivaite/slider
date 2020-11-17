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
  removeFlag(): void {
    this.div.style.display = "none";
  }
  addFlag(): void {
    this.div.style.display = "block";
  }
}
export default Flag