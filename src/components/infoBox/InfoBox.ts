import type { KKInfoBox } from './InfoBox.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { NoObservableAttribute } from '../../errors/NoObservableAttribute';
import { style } from './InfoBox.style';

const template = `
<div class="box">
  <span class="info"></span>
</div>
`;

export class InfoBox extends KKWebComponent implements KKInfoBox {
  static TAG = `kk-info-box`;
  static observedAttributes = ['kk-content'];

  private contentWrapper: HTMLSpanElement = this.shadowRoot.querySelector('.info') as HTMLSpanElement;

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
      case 'kk-content':
        this.content = newValue;
        break;
      default:
        throw new NoObservableAttribute(InfoBox.TAG, InfoBox.observedAttributes, name);
    }
  }
}

customElements.define(InfoBox.TAG, InfoBox);
