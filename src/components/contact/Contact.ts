import { isDefined } from '../../common/utils/isDefined';
import { KKContact } from './Contact.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { style } from './Contact.style';
import { TeamMemberContact } from '../teams/SingleTeam/SingleTeam.type';
import { UrlIcon } from '../urlIcon/UrlIcon';

const template = `
<ul class="contacts">
</ul>
`;

export class Contact extends KKWebComponent implements KKContact {
  static TAG = `kk-contact`;

  private readonly contactsWrapper: HTMLUListElement = this._shadowRoot.querySelector('.contacts') as HTMLUListElement;

  constructor(props: TeamMemberContact) {
    super(template, style);
    if (isDefined(props)) {
      this.setContacts(props);
    }
  }

  public setContacts({ discord, messanger, telegram, mail, phone }: TeamMemberContact): void {
    if (isDefined(discord)) {
      this.addContactItem('discord', discord);
    }
    if (isDefined(messanger)) {
      this.addContactItem('messanger', messanger);
    }
    if (isDefined(telegram)) {
      this.addContactItem('telegram', telegram);
    }
    if (isDefined(mail)) {
      this.addContactItem('mail', `mailto:${mail}`);
    }
    if (isDefined(phone)) {
      this.addContactItem('phone', `tel:${phone}`);
    }
  }

  private addContactItem(iconId: string, url: string): void {
    const newContact = document.createElement('li');
    newContact.className = 'contact__item';
    newContact.append(new UrlIcon(url, { KK_ICON_ID: iconId }));
    this.contactsWrapper.append(newContact);
  }
}

customElements.define(Contact.TAG, Contact);
