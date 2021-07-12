import { ViewConfig } from '../../types';

class ViewField {
  divElement!: HTMLDivElement;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.createField(config, root);
  }

  private createField(config: ViewConfig, root: HTMLElement): void {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__field';
    if(!config.isHorizontal) this.divElement.classList.add('js-slider__field_vertical');
    root!.append(this.divElement);
  }
}
export default ViewField;
