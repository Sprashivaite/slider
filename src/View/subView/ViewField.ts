import IView from '../IView';

class ViewField {
  divElement!: HTMLDivElement;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  constructor(View: IView) {
    this.init(View);
  }

  createField(): void {
    this.divElement = document.createElement('div');
    const styleDirection = this.isHorizontal
    ? 'js-slider__field_horizontal'
    : 'js-slider__field_vertical';
    this.divElement.className = `${styleDirection}`;
    this.slider.append(this.divElement);
  }

  private init(View: IView): void {
    this.isHorizontal = View.config.isHorizontal!;
    this.slider = View.slider.divElement;
  }
}
export default ViewField;
