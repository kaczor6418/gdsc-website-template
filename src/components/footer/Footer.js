import { gdscService } from '../../services/globalServices.ts';
import { KKWebComponent } from '../KKWebComponent.js';
import { SocialMedia } from '../socialMedia/SocialMedia.js';
import { style } from './Footer.style.js';

const template = `
<footer>
  <${SocialMedia.TAG}></${SocialMedia.TAG}>
</footer>
`;

export class Footer extends KKWebComponent {
  static TAG = `kk-footer`;

  footer = this.shadowRoot.querySelector('footer');
  socialMedia = this.shadowRoot.querySelector(SocialMedia.TAG);

  constructor() {
    super(template, style);
  }

  connectedCallback() {
    super.connectedCallback();
    void gdscService.getContact().then(this.addSocialMediaIcons);
  }

  addSocialMediaIcons = (icons) => {
    this.socialMedia.setSocialMediaIcons(icons);
  };

  setCopyright({ date, author, termsReferenceUrl }) {
    const copyrightText = this.formattedCopyrights`Copyright © ${date} ${author} Policy terms${termsReferenceUrl}`;
    const copyrightsElement = new DOMParser().parseFromString(copyrightText, 'text/html').body.firstElementChild;
    this.footer.append(copyrightsElement);
  }

  formattedCopyrights([copyright, separate, policyTerms], date, author, policyTermsUrl) {
    const policyTermsText = policyTerms.trim();
    const policyTermsUrlText = `<a href="${policyTermsUrl}">${policyTermsText}</a>`;
    return `<p>${copyright + date + separate + author}. ${policyTermsUrlText}</p>`;
  }
}

customElements.define(Footer.TAG, Footer);
