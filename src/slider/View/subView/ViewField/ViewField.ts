import './ViewField.css';
import { ViewConfig } from '../../../types';

class ViewField {
  divElement: HTMLDivElement;

  constructor(config: ViewConfig, root: HTMLDivElement) {
    this.divElement = this.createField(config, root);
  }

  private createField(config: ViewConfig, root: HTMLDivElement): HTMLDivElement {
    this.divElement = document.createElement('div');
    const fieldStyle = 'field';
    this.divElement.classList.add(fieldStyle, `js-${fieldStyle}`);
    if (!config.isHorizontal) {
      const modifier = 'field_vertical';
      this.divElement.classList.add(modifier, `js-${modifier}`);
    }
    root.append(this.divElement);
    return this.divElement;
  }
}
export default ViewField;
