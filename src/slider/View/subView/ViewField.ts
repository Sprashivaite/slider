import { viewConfig, viewElements } from '../../types';

class ViewField {
  divElement!: HTMLDivElement;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  constructor(data: viewConfig & viewElements) {
    this.createField(data);
  }

  private createField(data: viewConfig & viewElements): void {
    const { isHorizontal, root } = data;
    this.divElement = document.createElement('div');
    const styleDirection = isHorizontal
      ? 'js-slider__field_horizontal'
      : 'js-slider__field_vertical';
    this.divElement.className = `${styleDirection}`;
    root!.append(this.divElement);
  }
}
export default ViewField;
