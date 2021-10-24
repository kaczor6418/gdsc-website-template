import { style } from './Contact.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UrlIcon } from '../urlIcon/UrlIcon.js';

const template = `
<ul class="contacts">
  <li class="contact__item">
    <${UrlIcon.TAG} class="discord" kk-icon-id="discord"></${UrlIcon.TAG}>
  </li>
  <li class="contact__item">
    <${UrlIcon.TAG} class="messanger" kk-icon-id="messanger"></${UrlIcon.TAG}>
  </li>
  <li class="contact__item">
    <${UrlIcon.TAG} class="telegram" kk-icon-id="telegram"></${UrlIcon.TAG}>
  </li>
  <li class="contact__item">
    <${UrlIcon.TAG} class="mail" kk-icon-id="mail"></${UrlIcon.TAG}>
  </li>
  <li class="contact__item">
    <${UrlIcon.TAG} class="phone" kk-icon-id="phone"></${UrlIcon.TAG}>
  </li>
</ul>
`;

export class Contact extends KKWebComponent {
  static TAG = `kk-contact`;

  discord = this.shadowRoot.querySelector('.discord');
  messanger = this.shadowRoot.querySelector('.messanger');
  telegram = this.shadowRoot.querySelector('.telegram');
  mail = this.shadowRoot.querySelector('.mail');
  phone = this.shadowRoot.querySelector('.phone');

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
    this.mail.setAttribute('kk-url', `mailto:${mail}`);
    this.phone.setAttribute('kk-url', `tel:${phone}`);
  }

}

customElements.define(Contact.TAG, Contact);
