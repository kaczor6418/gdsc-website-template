import { IconID } from '../Icon/Icon.enum';
import { isDefined } from '../../common/utils/isDefined';
import { KKContact } from './Contact.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import style from './Contact.css';
import { TeamMemberContact } from '../../views/ClubTeams/SingleTeam/SingleTeam.type';
import { UrlIcon } from '../UrlIcon/UrlIcon';

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
      this.addContactItem(IconID.DISCORD, discord);
    }
    if (isDefined(messanger)) {
      this.addContactItem(IconID.MESSANGER, messanger);
    }
    if (isDefined(telegram)) {
      this.addContactItem(IconID.TELEGRAM, telegram);
    }
    if (isDefined(mail)) {
      this.addContactItem(IconID.MAIL, `mailto:${mail}`);
    }
    if (isDefined(phone)) {
      this.addContactItem(IconID.PHONE, `tel:${phone}`);
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
