import { KKWebComponent } from "../KKWebComponent.js";
import { style } from './LabeledAvatar.style.js';

const template = `
<div class="wrapper">
  <input class="avatar-img" width="128" height="128" type="image" alt="user avatar" src="./assets/images/default-avatar.webp">
  <label class="avatar-label"></label>
  <label class="avatar-sub-label"></label>
</div>
`;

export class LabeledAvatar extends KKWebComponent {
  static TAG = `kk-labeled-avatar`;

  wrapper = this.shadowRoot.querySelector('.wrapper');
  labelWrapper = this.shadowRoot.querySelector('.avatar-label');
  subLabelWrapper = this.shadowRoot.querySelector('.avatar-sub-label');
  imageWrapper = this.shadowRoot.querySelector('.avatar-img');

  constructor(label, photoUrl, subLabel, size) {
    super(template, style);
    this.label = label;
    this.subLabel = subLabel;
    this.avatar = photoUrl;
    if (size) {
      this.size = size;
    }
  }

  set label(text) {
    this.labelWrapper.textContent = text;
  }

  set subLabel(text) {
    this.subLabelWrapper.textContent = text;
  }

  set avatar(url) {
    this.imageWrapper.src = url;
  }

  set size({width, height}) {
    this.imageWrapper.style.width = width;
    this.imageWrapper.style.height = height;
  }


}

customElements.define(LabeledAvatar.TAG, LabeledAvatar);
