import { gdscService } from '../../services/globalServices.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { LabeledAvatar } from "../labeledAvatar/LabeledAvatar.js";
import { LabeledUrlIcon } from "../labeledUrlIcon/LabeledUrlIcon.js";
import { style } from './Info.style.js';

const template = `
<section class="organizers">
  <h2>Organizers</h2>
  <div class="items-wrapper organization-members"></div>
</section>
<section class="club-contact">
  <h2>Contact</h2>
  <div class="items-wrapper contact"></div>
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
      this.organizersWrapper.append(new LabeledAvatar(name, avatar, title));
    }
  }

  renderContacts = (contacts) => {
    for (const {iconId, url} of contacts) {
      this.contactWrapper.append(new LabeledUrlIcon({label: iconId.toUpperCase(), url, iconId}));
    }
  }
}

customElements.define(Info.TAG, Info);
