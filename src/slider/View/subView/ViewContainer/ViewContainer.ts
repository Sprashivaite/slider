import './ViewContainer.css';

class ViewContainer {
  divElement: HTMLElement;

  constructor(slider?: HTMLElement) {
    this.divElement =
      slider ?? ViewContainer.searchContainer() ?? ViewContainer.createContainer();
  }

  static createContainer(): HTMLElement {
    const sliderDiv = document.createElement('div');
    sliderDiv.classList.add('slider');
    document.body.append(sliderDiv);
    return sliderDiv;
  }

  static searchContainer(): HTMLElement | null {
    const container: HTMLDivElement | null = document.querySelector('[data-slider]');
    return container;
  }
}
export default ViewContainer;
