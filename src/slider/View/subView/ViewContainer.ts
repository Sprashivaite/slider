class ViewContainer {
  divElement!: HTMLElement;

  constructor(slider?: HTMLElement) {
    if (slider) this.divElement = slider;
    else this.searchContainer();
    if (!this.divElement) this.createContainer();
  }

  private searchContainer(): void {
    const container: HTMLDivElement | null = document.querySelector('[data-slider]');
    if (container) this.divElement = container;
  }

  private createContainer(): void {
    const sliderDiv = document.createElement('div');
    sliderDiv.classList.add('slider');
    document.body.append(sliderDiv);
    this.divElement = sliderDiv;
  }
}
export default ViewContainer;
