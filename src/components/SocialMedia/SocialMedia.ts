import { IconID, IconSize } from '../Icon/Icon.enum';
import type { ContactMedia } from '../../common/types';
import { Icon } from '../Icon/Icon';
import type { KKSocialMedia } from './SocialMedia.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import style from './SocialMedia.css';

const template = `
<section>
</section>
`;

export class SocialMedia extends KKWebComponent implements KKSocialMedia {
  static TAG = `kk-social-media`;

  private readonly iconsWrapper: HTMLElement = this._shadowRoot.querySelector('section') as HTMLElement;

  constructor() {
    super(template, style);
  }

  public setSocialMediaIcons(icons: ContactMedia[]): void {
    const socialMediaIcons = document.createDocumentFragment();
    for (const { iconId, url } of icons) {
      socialMediaIcons.append(this.createSocialMediaIcon(iconId, url));
    }
    this.iconsWrapper.append(socialMediaIcons);
  }

  private createSocialMediaIcon(iconId: string | IconID, url: string): HTMLAnchorElement {
    const iconWrapper: HTMLAnchorElement = document.createElement('a');
    iconWrapper.href = url;
    iconWrapper.textContent = iconId;
    iconWrapper.append(new Icon(iconId, IconSize.S));
    return iconWrapper;
  }
}

customElements.define(SocialMedia.TAG, SocialMedia);
