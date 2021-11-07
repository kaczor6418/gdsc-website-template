import { style } from './SingleTeam.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { LabeledUrlAvatar } from '../labeledUrlAvatar/LabeledAvatar.js';
import { Contact } from '../contact/Contact.js';

const template = `
<details>
  <summary><h2 class="team-name"></h2></summary>
  <section class="single-section technologies"></section>
  <section class="single-section">
    <h3>Description:</h3>
    <p class="section-description description"></p>
  </section>
  <section class="single-section">
    <h3>Looking for:</h3>
    <p class="section-description looking-for"></p>
  </section>
  <section class="single-section team-info">
    <div>
      <h3>Contact:</h3>
      <${Contact.TAG}></${Contact.TAG}>
    </div>      
    <div>
      <h3>Members:</h3>
      <div class="members"></div>
    </div>
  </section>
</details>
`;

export class SingleTeam extends KKWebComponent {
  static TAG = `kk-single-team`;

  nameWrapper = this.shadowRoot.querySelector('.team-name');
  technologiesWrapper = this.shadowRoot.querySelector('.technologies');
  descriptionWrapper = this.shadowRoot.querySelector('.description');
  lookingForWrapper = this.shadowRoot.querySelector('.looking-for');
  contacts = this.shadowRoot.querySelector(Contact.TAG);
  membersWrapper = this.shadowRoot.querySelector('.members');

  constructor(props) {
    super(template, style);
    this.initializeDate(props);
  }

  initializeDate({contact, members, ...basic}) {
    this.nameWrapper.id = basic.name;
    this.nameWrapper.textContent = basic.name;
    this.descriptionWrapper.textContent = basic.description;
    this.lookingForWrapper.textContent = basic.lookingFor;
    this.contacts.setContacts(contact);
    for (const {name, avatarUrl} of members) {
      this.membersWrapper.append(new LabeledUrlAvatar(name, avatarUrl))
    }
  }
}

customElements.define(SingleTeam.TAG, SingleTeam);
