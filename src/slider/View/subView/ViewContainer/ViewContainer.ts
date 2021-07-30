import './ViewContainer.css';

class ViewContainer {
  divElement: HTMLDivElement;

  constructor(slider?: HTMLDivElement) {
    this.divElement =
      slider ?? ViewContainer.searchContainer() ?? ViewContainer.createContainer();
  }

  static createContainer(): HTMLDivElement {
    const sliderDiv = document.createElement('div');
    sliderDiv.classList.add('slider');
    document.body.append(sliderDiv);
    return sliderDiv;
  }

  static searchContainer(): HTMLDivElement | null {
    const container: HTMLDivElement | null = document.querySelector('[data-slider]');
    return container;
  }
}
export default ViewContainer;
