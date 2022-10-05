import { Copyrights, KKFooter } from './Footer.type';
import { ContactMedia } from '../../common/types';
import { CouldNotParseStringToHTMLElementError } from '../../errors/CouldNotParseStringToHTMLElementError';
import { gdscService } from '../../services/globalServices';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';
import { KKSocialMedia } from '../../components/SocialMedia/SocialMedia.type';
import { KKWebComponent } from '../../components/KKWebComponent/KKWebComponent';
import { SocialMedia } from '../../components/SocialMedia/SocialMedia';
import style from './Footer.css';

const template = `
<footer>
  <${SocialMedia.TAG}></${SocialMedia.TAG}>
</footer>
`;

export class Footer extends KKWebComponent implements KKFooter {
  static TAG = `kk-footer`;

  private readonly footer: HTMLElement = this._shadowRoot.querySelector('footer') as HTMLElement;
  private readonly socialMedia: KKSocialMedia = this.footer.querySelector(SocialMedia.TAG) as KKSocialMedia;

  constructor() {
    super(template, style);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void gdscService.getContact().then(this.addSocialMediaIcons);
  }

  private addSocialMediaIcons = (icons: ContactMedia[]): void => {
    this.socialMedia.setSocialMediaIcons(icons);
  };

  public setCopyright({ date, author, termsReferenceUrl }: Copyrights): void {
    const copyrightText = this.formattedCopyrights`Copyright © ${date} ${author} Policy terms${termsReferenceUrl}`;
    const copyrightsElement = new DOMParser().parseFromString(copyrightText, 'text/html').body.firstElementChild;
    if (isNullOrUndefined(copyrightsElement)) {
      throw new CouldNotParseStringToHTMLElementError(copyrightText);
    }
    this.footer.append(copyrightsElement);
  }

  formattedCopyrights([copyright, separate, policyTerms]: TemplateStringsArray, date: string, author: string, policyTermsUrl: string): string {
    const policyTermsText = policyTerms.trim();
    const policyTermsUrlText = `<a href="${policyTermsUrl}">${policyTermsText}</a>`;
    return `<p>${copyright + date + separate + author}. ${policyTermsUrlText}</p>`;
  }
}

customElements.define(Footer.TAG, Footer);
