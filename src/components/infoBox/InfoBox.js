import { style } from './InfoBox.style.js'
import { KKWebComponent } from "../KKWebComponent.js";

const template = `
<div class="box">
  <span class="info"></span>
</div>
`;

export class InfoBox extends KKWebComponent {
  static TAG = `kk-info-box`;
  static observedAttributes = ['kk-content'];

  contentWrapper = this.shadowRoot.querySelector('.info');

  constructor(infoContent) {
    super(template, style);
    if(infoContent) {
      this.content = infoContent;
    }
  }

  get content() {
    return this.contentWrapper.textContent;
  }

  set content(value) {
    this.contentWrapper.textContent = value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return void 0;
    }
    switch (name) {
      case 'kk-content':
        this.content = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${InfoBox.name} component`);
    }
  }

}

customElements.define(InfoBox.TAG, InfoBox);
