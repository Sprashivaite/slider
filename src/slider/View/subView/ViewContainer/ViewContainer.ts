import './ViewContainer.css';

class ViewContainer {
  divElement: HTMLDivElement;

  constructor(slider?: HTMLDivElement) {
    this.divElement = slider ?? this.searchContainer();
  }

  private createContainer(): HTMLDivElement {
    this.divElement = document.createElement('div');
    this.divElement.classList.add('slider');
    document.body.append(this.divElement);
    return this.divElement;
  }

  private searchContainer(): HTMLDivElement {
    const container = document.querySelector('[data-slider]');
    if (container instanceof HTMLDivElement) {
      this.divElement = container;
      return this.divElement;
    }
    return this.createContainer();
  }
}
export default ViewContainer;
