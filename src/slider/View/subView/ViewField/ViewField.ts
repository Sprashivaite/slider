import './ViewField.css';
import { ViewConfig } from '../../../types';

class ViewField {
  divElement: HTMLDivElement;

  isHorizontal: boolean;

  constructor(config: ViewConfig, root: HTMLDivElement) {
    this.isHorizontal = config.isHorizontal;
    this.divElement = this.createField(root);
  }

  getSize(): number {
    return this.isHorizontal ? this.divElement.offsetWidth : this.divElement.offsetHeight;
  }

  getOffset(): number {
    const direction = this.isHorizontal ? 'left' : 'top';
    return this.divElement.getBoundingClientRect()[direction];
  }

  private createField(root: HTMLDivElement): HTMLDivElement {
    this.divElement = document.createElement('div');
    const className = 'field';
    this.divElement.classList.add(className, `js-${className}`);
    if (!this.isHorizontal) {
      const modifier = 'field_vertical';
      this.divElement.classList.add(modifier, `js-${modifier}`);
    }
    root.append(this.divElement);
    return this.divElement;
  }
}
export default ViewField;
