import { viewConfig, viewElements } from '../../types';

class ViewField {
  divElement!: HTMLDivElement;

  constructor(data: viewConfig & viewElements) {
    this.createField(data);
  }

  private createField(data: viewConfig & viewElements): void {
    const { isHorizontal, root } = data;
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__field';
    if(!isHorizontal) this.divElement.classList.add('js-slider__field_vertical');
    root!.append(this.divElement);
  }
}
export default ViewField;
