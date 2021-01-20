class ViewContainer {
  div!: HTMLDivElement;

  constructor(slider?: HTMLDivElement) {
    slider ? (this.div = slider) : this.searchContainer();
    if(!this.div) this.createContainer();    
  }
  searchContainer(): void {
    if (document.querySelector(".slider")) {
      this.div = document.querySelector(".slider");
    };
    if (document.querySelector("[data-slider]")) {
      this.div = document.querySelector("[data-slider]");
    };
  }
  createContainer(): void {
    const sliderDiv = document.createElement("div");
    sliderDiv.classList.add("slider");
    document.body.append(sliderDiv);
    this.div = sliderDiv;
  }
}
export default ViewContainer;
