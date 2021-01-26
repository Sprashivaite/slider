class ViewContainer {
  div!: HTMLDivElement;

  constructor(slider?: HTMLDivElement) {
    if( slider ) this.div = slider
    else this.searchContainer() 
    if (!this.div) this.createContainer();
  }

  searchContainer(): void {
    const container: HTMLDivElement | null = document.querySelector("[data-slider]")
    if (container) {
      this.div = container;
    }
  }

  createContainer(): void {
    const sliderDiv = document.createElement("div");
    sliderDiv.classList.add("slider");
    document.body.append(sliderDiv);
    this.div = sliderDiv;
  }
}
export default ViewContainer;
