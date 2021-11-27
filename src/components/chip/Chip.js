import { style } from './Chip.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = `
  <span class="chip">#javascript</span>
`;

export class Chip extends KKWebComponent {
  static TAG = `kk-body`;

  bodyWrapper = this.shadowRoot.querySelector('main');

  constructor() {
    super(template, style);
  }

}

customElements.define(Chip.TAG, Chip);
