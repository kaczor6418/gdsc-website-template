import type { ChipObservedAttributesTypes, KKChip } from './Chip.type';
import { ChipObservedAttributes } from './Chip.enum';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { NoObservableAttribute } from '../../errors/NoObservableAttribute';
import style from './Chip.css';

const template = `
  <span class="chip"></span>
`;

export class Chip extends KKWebComponent<ChipObservedAttributesTypes> implements KKChip {
  static TAG = `kk-chip`;
  static observedAttributes = [ChipObservedAttributes.KK_TEXT];

  protected readonly tagWrapper: HTMLSpanElement = this._shadowRoot.querySelector('.chip') as HTMLSpanElement;

  constructor(content: string) {
    super(template, style);
    if (content) {
      this.setAttribute(ChipObservedAttributes.KK_TEXT, content);
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
      case ChipObservedAttributes.KK_TEXT:
        this.content = newValue;
        break;
      default:
        throw new NoObservableAttribute(Chip.TAG, Chip.observedAttributes, name);
    }
  }
}

customElements.define(Chip.TAG, Chip);
