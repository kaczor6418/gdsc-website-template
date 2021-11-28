import { gdscService } from '../../services/globalServices.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { LabeledAvatar } from "../labeledAvatar/LabeledAvatar.js";
import { LabeledUrlIcon } from "../labeledUrlIcon/LabeledUrlIcon.js";
import { style } from './Info.style.js';

const template = `
<section class="organizers">
  <h2>Organizers</h2>
  <ul class="items-wrapper organization-members"></ul>
</section>
<section class="club-contact">
  <h2>Contact</h2>
  <ul class="items-wrapper contact"></ul>
</section>
`;

export class Info extends KKWebComponent {
  static TAG = `kk-club-contact`;

  organizersWrapper = this.shadowRoot.querySelector('.organization-members');
  contactWrapper = this.shadowRoot.querySelector('.contact');

  constructor() {
    super(template, style);
  }

  connectedCallback() {
    super.connectedCallback();
    void gdscService.getOrganizers().then(this.renderMembers)
    void gdscService.getContact().then(this.renderContacts)
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
}

customElements.define(Info.TAG, Info);
