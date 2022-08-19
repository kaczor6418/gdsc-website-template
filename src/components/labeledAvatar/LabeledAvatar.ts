import { KKLabeledAvatar } from './LabeledAvatar.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import type { Size } from '../../common/types';
import { style } from './LabeledAvatar.style';

const template = `
<div class="wrapper">
  <input class="avatar-img" width="128" height="128" type="image" alt="user avatar" src="./assets/images/default-avatar.webp">
  <label class="avatar-label"></label>
  <label class="avatar-sub-label"></label>
</div>
`;

export class LabeledAvatar extends KKWebComponent implements KKLabeledAvatar {
  static TAG = `kk-labeled-avatar`;

  private readonly labelWrapper: HTMLLabelElement = this.shadowRoot.querySelector('.avatar-label') as HTMLLabelElement;
  private readonly subLabelWrapper: HTMLLabelElement = this.shadowRoot.querySelector('.avatar-sub-label') as HTMLLabelElement;
  private readonly imageWrapper: HTMLInputElement = this.shadowRoot.querySelector('.avatar-img') as HTMLInputElement;

  constructor(label: string, photoUrl: string, subLabel: string, size: Size) {
    super(template, style);
    this.label = label;
    this.subLabel = subLabel;
    this.avatar = photoUrl;
    if (size) {
      this.size = size;
    }
  }

  get label(): string {
    return this.labelWrapper.textContent ?? '';
  }

  set label(text: string) {
    this.labelWrapper.textContent = text;
  }

  get subLabel(): string {
    return this.subLabelWrapper.textContent ?? '';
  }

  set subLabel(text: string) {
    this.subLabelWrapper.textContent = text;
  }

  get avatar(): string {
    return this.imageWrapper.src;
  }

  set avatar(url: string) {
    this.imageWrapper.src = url;
  }

  get size(): Size {
    return {
      height: Number(this.imageWrapper.style.height),
      width: Number(this.imageWrapper.style.width),
    };
  }

  set size({ width, height }: Size) {
    this.imageWrapper.style.width = width.toString();
    this.imageWrapper.style.height = height.toString();
  }
}

customElements.define(LabeledAvatar.TAG, LabeledAvatar);
