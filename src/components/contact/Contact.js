import { style } from './Contact.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UrlIcon } from '../urlIcon/UrlIcon.js';
import { Icon } from '../icon/Icon.js';

const template = `
<ul>
  <li class="discord">
    <${UrlIcon.TAG} kk-icon-id="discord"></${UrlIcon.TAG}>
  </li>
  <li class="messanger">
    <${UrlIcon.TAG} kk-icon-id="messanger"></${UrlIcon.TAG}>
  </li>
  <li class="telegram">
    <${UrlIcon.TAG} kk-icon-id="telegram"></${UrlIcon.TAG}>
  </li>
  <li class="mail">
    <a class="mail__to" href="mailto:gdsc@lodz.pl">
      <${Icon.TAG} kk-icon-id="mail"></${Icon.TAG}>
      <label class="mail__name"></label>
    </a>
  </li>
  <li class="phone">
    <a class="phone__to" href="tel:+48111222333">
      <${Icon.TAG} kk-icon-id="phone"></${Icon.TAG}>
      <label class="phone__number"></label>
    </a>
  </li>
</ul>
`;

export class Contact extends KKWebComponent {
  static TAG = `kk-contact`;

  discord = this.shadowRoot.querySelector('.discord');
  messanger = this.shadowRoot.querySelector('.messanger');
  telegram = this.shadowRoot.querySelector('.telegram');
  mail = this.shadowRoot.querySelector('.mail__name');
  mailTo = this.shadowRoot.querySelector('.mail__to');
  phone = this.shadowRoot.querySelector('.phone__number');
  phoneTo = this.shadowRoot.querySelector('.phone__to');

  constructor(props) {
    super(template, style);
    if(props !== undefined) {
      this.setContacts(props);
    }
  }

  setContacts({discord, messanger, telegram, mail, phone}) {
    this.discord.setAttribute('kk-url', discord);
    this.messanger.setAttribute('kk-url', messanger);
    this.telegram.setAttribute('kk-url', telegram);
    this.mail.textContent = mail;
    this.mailTo.href = `mailto:${phone}`;    
    this.phone.textContent = phone;
    this.phoneTo.href = `tel:${phone}`;
  }

}

customElements.define(Contact.TAG, Contact);
