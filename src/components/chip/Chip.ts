import type { ChipObservedAttributesTypes, IChip } from './Chip.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { style } from './Chip.style';

const template = `
  <span class="chip"></span>
`;

export class Chip extends KKWebComponent<ChipObservedAttributesTypes> implements IChip {
  static TAG = `kk-chip`;
  static observedAttributes = ['kk-text'];

  private readonly tagWrapper: HTMLSpanElement = this.shadowRoot.querySelector('.chip') as HTMLSpanElement;

  constructor(content: string) {
    super(template, style);
    if (content) {
      this.setAttribute('kk-text', content);
    }
  }

  set content(value: string) {
    this.tagWrapper.textContent = value;
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case 'kk-text':
        this.content = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${Chip.TAG} component`);
    }
  }
}

customElements.define(Chip.TAG, Chip);
