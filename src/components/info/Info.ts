import { ClubMember, ContactMedia } from '../../common/types';
import { gdscService } from '../../services/globalServices';
import { KKInfo } from './Info.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { LabeledAvatar } from '../labeledAvatar/LabeledAvatar';
import { LabeledUrlIcon } from '../labeledUrlIcon/LabeledUrlIcon';
import { style } from './Info.style';

const template = `
<section class="description">
  <h2>Description</h2>
  <div class="description-wrapper"></div>
</section>
<section class="club-contact">
  <h2>Contact</h2>
  <ul class="items-wrapper contact-wrapper"></ul>
</section>
<section class="organizers">
  <h2>Organizers</h2>
  <ul class="items-wrapper organizers-wrapper"></ul>
</section>
`;

export class Info extends KKWebComponent implements KKInfo {
  static TAG = `kk-club-contact`;

  private readonly organizersWrapper: HTMLUListElement = this.shadowRoot.querySelector('.organizers-wrapper') as HTMLUListElement;
  private readonly contactWrapper: HTMLUListElement = this.shadowRoot.querySelector('.contact-wrapper') as HTMLUListElement;
  private readonly descriptionWrapper: HTMLDivElement = this.shadowRoot.querySelector('.description-wrapper') as HTMLDivElement;

  constructor() {
    super(template, style);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void gdscService.getOrganizers().then(this.renderMembers);
    void gdscService.getContact().then(this.renderContacts);
    void gdscService.getDescription().then(this.renderDescription);
  }

  renderMembers = (members: ClubMember[]): void => {
    for (const { avatar, name, title } of members) {
      const singleOrganizer = document.createElement('li');
      singleOrganizer.append(new LabeledAvatar(name, avatar, title));
      this.organizersWrapper.append(singleOrganizer);
    }
  };

  renderContacts = (contacts: ContactMedia[]): void => {
    for (const { iconId, url } of contacts) {
      const singleContact = document.createElement('li');
      singleContact.append(new LabeledUrlIcon({ iconId: iconId, label: iconId.toUpperCase(), url: url }));
      this.contactWrapper.append(singleContact);
    }
  };

  renderDescription = (description: string): void => {
    this.descriptionWrapper.innerHTML = description;
  };
}

customElements.define(Info.TAG, Info);
