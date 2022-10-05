import type { KKLabeledUrlAvatar } from './LabeledUrlAvatar.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import style from './LabeledUrlAvatar.css';

const template = `
<a class="wrapper" href="#">
  <input class="avatar-img" type="image" alt="user avatar" src="./assets/images/default-avatar.webp">
  <label class="avatar-label"></label>
</a>
`;

export class LabeledUrlAvatar extends KKWebComponent implements KKLabeledUrlAvatar {
  static TAG = `kk-labeled-url-avatar`;

  private readonly wrapper: HTMLAnchorElement = this._shadowRoot.querySelector('.wrapper') as HTMLAnchorElement;
  private readonly labelWrapper: HTMLLabelElement = this._shadowRoot.querySelector('.avatar-label') as HTMLLabelElement;
  private readonly imageWrapper: HTMLInputElement = this._shadowRoot.querySelector('.avatar-img') as HTMLInputElement;

  constructor(label: string, photoUrl: string, userUrl: string) {
    super(template, style);
    this.wrapper.href = userUrl;
    this.label = label;
    this.avatar = photoUrl;
  }

  get label(): string {
    return this.labelWrapper.textContent ?? '';
  }

  set label(text: string) {
    this.labelWrapper.textContent = text;
  }

  get avatar(): string {
    return this.imageWrapper.src;
  }

  set avatar(url: string) {
    this.imageWrapper.src = url;
  }
}

customElements.define(LabeledUrlAvatar.TAG, LabeledUrlAvatar);
