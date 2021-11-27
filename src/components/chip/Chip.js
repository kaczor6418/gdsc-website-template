import { style } from './Chip.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = `
  <span class="chip"></span>
`;

export class Chip extends KKWebComponent {
  static TAG = `kk-chip`;
  static observedAttributes = ['kk-text'];

  tagWrapper = this.shadowRoot.querySelector('.chip');

  constructor(content) {
    super(template, style);
    if (content) {
      this.content = content;
    }
  }

  set content(value) {
    this.tagWrapper.textContent = value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return void 0;
    }
    switch (name) {
      case 'kk-text':
        this.content = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${Chip.name} component`);
    }
  }

}

customElements.define(Chip.TAG, Chip);
