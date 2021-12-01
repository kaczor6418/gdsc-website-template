import { gdscService } from '../../services/globalServices.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { LabeledAvatar } from "../labeledAvatar/LabeledAvatar.js";
import { LabeledUrlIcon } from "../labeledUrlIcon/LabeledUrlIcon.js";
import { style } from './Info.style.js';

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

export class Info extends KKWebComponent {
  static TAG = `kk-club-contact`;

  organizersWrapper = this.shadowRoot.querySelector('.organizers-wrapper');
  contactWrapper = this.shadowRoot.querySelector('.contact-wrapper');
  descriptionWrapper = this.shadowRoot.querySelector('.description-wrapper');

  constructor() {
    super(template, style);
  }

  connectedCallback() {
    super.connectedCallback();
    void gdscService.getOrganizers().then(this.renderMembers)
    void gdscService.getContact().then(this.renderContacts)
    void gdscService.getDescription().then(this.renderDescription)
  }

  renderMembers = (members) => {
    for (const {avatar, name, title} of members) {
      const singleOrganizer = document.createElement('li');
      singleOrganizer.append(new LabeledAvatar(name, avatar, title));
      this.organizersWrapper.append(singleOrganizer);
    }
  }

  renderContacts = (contacts) => {
    for (const {iconId, url} of contacts) {
      const singleContact = document.createElement('li');
      singleContact.append(new LabeledUrlIcon({label: iconId.toUpperCase(), url, iconId}));
      this.contactWrapper.append(singleContact);
    }
  }

  renderDescription = (description) => {
    this.descriptionWrapper.innerHTML =description;
  }
}

customElements.define(Info.TAG, Info);
