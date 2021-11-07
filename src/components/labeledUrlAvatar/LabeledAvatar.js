import { style } from './LabeledUrlAvatar.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = `
<a class="wrapper" href="#">
  <input class="avatar-img" type="image" alt="user avatar" src="./assets/images/default-avatar.webp">
  <label class="avatar-label"></label>
</a>
`;

export class LabeledUrlAvatar extends KKWebComponent {
  static TAG = `kk-labeled-avatar`;

  wrapper = this.shadowRoot.querySelector('.wrapper');
  labelWrapper = this.shadowRoot.querySelector('.avatar-label');
  imageWrapper = this.shadowRoot.querySelector('.avatar-img');

  constructor(label, photoUrl, userUrl) {
    super(template, style);
    this.wrapper.href = userUrl;
    this.label = label;
    this.avatar = photoUrl;
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

customElements.define(LabeledUrlAvatar.TAG, LabeledUrlAvatar);
