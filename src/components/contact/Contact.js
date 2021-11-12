import { style } from './Contact.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UrlIcon } from '../urlIcon/UrlIcon.js';

const template = `
<ul class="contacts">
</ul>
`;

export class Contact extends KKWebComponent {
  static TAG = `kk-contact`;

  contactsWrapper = this.shadowRoot.querySelector('.contacts');
  discord = null;
  messanger = null;
  telegram = null;
  mail = null;
  phone = null;

  constructor(props) {
    super(template, style);
    if(props !== undefined) {
      this.setContacts(props);
    }
  }

  setContacts({discord, messanger, telegram, mail, phone}) {
    if (discord) {
      this.addContactItem('discord', discord, 'discord');
    }
    if (messanger) {
      this.addContactItem('messanger', messanger, 'messanger');
    }
    if (telegram) {
      this.addContactItem('telegram', telegram, 'telegram');
    }
    if (mail) {
      this.addContactItem('mail', `mailto:${mail}`, 'mail');
    }
    if (phone) {
      this.addContactItem('phone', `tel:${phone}`, 'phone');
    }
  }

  addContactItem(iconId, url, contact) {
    this[contact] = document.createElement('li');
    this[contact].className = 'contact__item';
    this[contact].append(new UrlIcon(url, {'kk-icon-id': iconId}));
    this.contactsWrapper.append(this[contact]);
  }

}

customElements.define(Contact.TAG, Contact);
