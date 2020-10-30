class Flag {
  flag: HTMLDivElement;
  button: HTMLDivElement;
  constructor(button: HTMLDivElement) {
    this.flag = document.createElement("div");
    this.button = button;
  }
  createFlag(): void {
    this.flag.className = "flag";
    this.flag.style.top = "-17px";
    this.button.append(this.flag);
  }
  changeFlagValue(value: number): void {
    this.flag.innerHTML = value + "";
  }
  removeFlag(): void {
    this.flag.style.display = "none";
  }
  addFlag(): void {
    this.flag.style.display = "block";
  }
}
export default Flag