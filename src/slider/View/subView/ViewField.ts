import { ViewConfig } from '../../types';

class ViewField {
  divElement: HTMLElement;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.divElement = this.createField(config, root);
  }

  private createField(config: ViewConfig, root: HTMLElement): HTMLElement {
    this.divElement = document.createElement('div');
    const style = 'slider__field';
    this.divElement.className = `${style} js-${style}`;
    if (!config.isHorizontal) {
      const modifier = 'slider__field_vertical';
      this.divElement.classList.add(modifier);
      this.divElement.classList.add(`js-${modifier}`);
    }
    root.append(this.divElement);
    return this.divElement;
  }
}
export default ViewField;
