import type { ContactMedia } from '../../common/types';
import { Icon } from '../icon/Icon';
import { IconSize } from '../icon/Icon.enum';
import type { KKSocialMedia } from './SocialMedia.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { style } from './SocialMedia.style';

const template = `
<section>
</section>
`;

export class SocialMedia extends KKWebComponent implements KKSocialMedia {
  static TAG = `kk-social-media`;

  private readonly iconsWrapper: HTMLElement = this.shadowRoot.querySelector('section') as HTMLElement;

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

  private createSocialMediaIcon(iconId: string, url: string): HTMLAnchorElement {
    const iconWrapper: HTMLAnchorElement = document.createElement('a');
    iconWrapper.href = url;
    iconWrapper.textContent = iconId;
    iconWrapper.append(new Icon(iconId, IconSize.S));
    return iconWrapper;
  }
}

customElements.define(SocialMedia.TAG, SocialMedia);
