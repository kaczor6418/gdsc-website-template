import { InfoBoxObservedAttributes } from './InfoBox.enum';
import type { InfoBoxObservedAttributesTypes } from './InfoBox.type';
import type { KKInfoBox } from './InfoBox.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { NoObservableAttribute } from '../../errors/NoObservableAttribute';
import style from './InfoBox.css';

const template = `
<div class="box">
  <span class="info"></span>
</div>
`;

export class InfoBox extends KKWebComponent<InfoBoxObservedAttributesTypes> implements KKInfoBox {
  static TAG = `kk-info-box`;
  static observedAttributes = [InfoBoxObservedAttributes.KK_CONTENT];

  private contentWrapper: HTMLSpanElement = this._shadowRoot.querySelector('.info') as HTMLSpanElement;

  constructor(infoContent: string) {
    super(template, style);
    if (infoContent) {
      this.content = infoContent;
    }
  }

  get content(): string {
    return this.contentWrapper.textContent ?? '';
  }

  set content(value: string) {
    this.contentWrapper.textContent = value;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case InfoBoxObservedAttributes.KK_CONTENT:
        this.content = newValue;
        break;
      default:
        throw new NoObservableAttribute(InfoBox.TAG, InfoBox.observedAttributes, name);
    }
  }
}

customElements.define(InfoBox.TAG, InfoBox);
