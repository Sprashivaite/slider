import { ViewConfig } from '../../types';

class ViewField {
  divElement!: HTMLDivElement;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.createField(config, root);
  }

  private createField(config: ViewConfig, root: HTMLElement): void {
    this.divElement = document.createElement('div');
    const style = 'slider__field';
    this.divElement.className = `${style} js-${style}`;
    if (!config.isHorizontal) {
      const modifier = 'slider__field_vertical';
      this.divElement.classList.add(modifier);
      this.divElement.classList.add(`js-${modifier}`);
    }
    root!.append(this.divElement);
  }
}
export default ViewField;
