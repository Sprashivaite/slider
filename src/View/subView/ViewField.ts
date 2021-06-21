import IView from '../IView';

class ViewField {
  div!: HTMLDivElement;

  isHorizontal!: boolean;

  slider!: HTMLElement;

  constructor(View: IView) {
    this.init(View);
  }

  createField(): void {
    this.div = document.createElement('div');
    const styleDirection = this.isHorizontal
    ? 'js-slider__field_horizontal'
    : 'js-slider__field_vertical';
    this.div.className = `${styleDirection}`;
    this.slider.append(this.div);
  }

  private init(View: IView): void {
    this.isHorizontal = View.config.isHorizontal!;
    this.slider = View.slider.div;
  }
}
export default ViewField;
