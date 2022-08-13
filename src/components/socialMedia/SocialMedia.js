import { Icon } from '../icon/Icon.js';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent.ts';
import { style } from './SocialMedia.style.js';

const template = `
<section>
</section>
`;

export class SocialMedia extends KKWebComponent {
  static TAG = `kk-social-media`;

  iconsWrapper = this.shadowRoot.querySelector('section');

  constructor() {
    super(template, style);
  }

  setSocialMediaIcons(icons) {
    const socialMediaIcons = document.createDocumentFragment();
    for (const { iconId, url } of icons) {
      socialMediaIcons.append(this.createSocialMediaIcon(iconId, url));
    }
    this.iconsWrapper.append(socialMediaIcons);
  }

  createSocialMediaIcon(iconId, url) {
    const iconWrapper = document.createElement('a');
    iconWrapper.href = url;
    iconWrapper.textContent = iconId;
    iconWrapper.append(new Icon(iconId, 32));
    return iconWrapper;
  }
}

customElements.define(SocialMedia.TAG, SocialMedia);
