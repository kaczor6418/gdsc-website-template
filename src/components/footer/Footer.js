
import { style } from './Footer.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { Icon } from '../icon/Icon.js';

const template = `
<footer>
</footer>
`;

export class Footer extends KKWebComponent {
  static TAG = `kk-footer`;

  footer = this.shadowRoot.querySelector('footer');

  constructor() {
    super(template, style);
  }

  setCopyright({ date, author, termsReferenceUrl }) {
    const copyrightText = this.formattedCopyrights`Copyright © ${date} ${author} Policy terms${termsReferenceUrl}`;
    const copyrightsElement = new DOMParser().parseFromString(copyrightText, 'text/html').body.firstElementChild;
    this.footer.append(copyrightsElement);
  }

  formattedCopyrights(
    [copyright, separate, policyTerms],
    date,
    author,
    policyTermsUrl
  ) {
    const policyTermsText = policyTerms.trim();
    const policyTermsUrlText = `<a href="${policyTermsUrl}">${policyTermsText}</a>`;
    return `<p>${copyright + date + separate + author}. ${policyTermsUrlText}</p>`;
  }
}

customElements.define(Footer.TAG, Footer);
