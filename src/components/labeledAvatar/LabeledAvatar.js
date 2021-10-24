import { style } from './LabeledAvatar.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = `
<div>
  <input class="avatar-img" type="image" alt="user avatar" src="./assets/images/avatart.jpg">
  <label class="avatar-label"></label>
</div>
`;

export class LabeledAvatar extends KKWebComponent {
  static TAG = `kk-labeled-avatar`;

  labelWrapper = this.shadowRoot.querySelector('.avatar-label');
  imageWrapper = this.shadowRoot.querySelector('.avatar-img');

  constructor(label, url) {
    super(template, style);
    this.label = label;
    this.avatar = url;
  }

  set label(text) {
    this.labelWrapper.textContent = text;
  }

  get label() {
    return this.labelWrapper.textContent;
  }  
  
  set avatar(url) {
    this.imageWrapper.src = url;
  }

  get avatar() {
    return this.imageWrapper.src;
  }


}

customElements.define(LabeledAvatar.TAG, LabeledAvatar);
