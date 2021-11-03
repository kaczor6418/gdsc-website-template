import { style } from './LabeledUrlIcon.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { Icon } from '../icon/Icon.js';

const template = `
<a class="wrapper">
  <${Icon.TAG} class="icon"></${Icon.TAG}>
  <label class="label"></label>
</a>
`;

export class LabeledUrlIcon extends KKWebComponent {
  static TAG = `kk-labeled-url-icon`;

  wrapper = this.shadowRoot.querySelector('.wrapper');
  _icon = this.wrapper.querySelector('.icon');
  _label = this.wrapper.querySelector('.label');

  set icon(iconId) {
    void this._icon.setIcon(iconId);
  }

  set label(text) {
    this._label.textContent = text;
  }

  constructor(label, iconId, url) {
    super(template, style);
  }
  
}

customElements.define(LabeledUrlIcon.TAG, LabeledUrlIcon);
