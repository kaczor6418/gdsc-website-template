import { style } from './SingleTeam.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { LabeledAvatar } from '../labeledAvatar/LabeledAvatar.js';
import { Contact } from '../contact/Contact.js';

const template = `
<details>
  <summary><h2 class="team-name"></h2></summary>
  <section class="technologies"></section>
  <section>
    <h3>Description:</h3>
    <p class="description"></p>
  </section>
  <section>
    <h3>Looking for:</h3>
    <p class="looking-for"></p>
  </section>
  <section>
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
    for (const {name, url} of members) {
      this.membersWrapper.append(new LabeledAvatar(name, url))
    }
  }
}

customElements.define(SingleTeam.TAG, SingleTeam);
