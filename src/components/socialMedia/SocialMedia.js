import { style } from "./SocialMedia.style.js";
import { KKWebComponent } from "../KKWebComponent.js";
import { Icon } from "../icon/Icon.js";

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
    const socailMediaIcons = document.createDocumentFragment();
    for(const {iconId, url} of icons) {
      socailMediaIcons.append(this.createSocialMediaIcon(iconId, url));
    }
    this.iconsWrapper.append(socailMediaIcons);
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