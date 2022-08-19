import { Chip } from '../chip/Chip.ts';
import { Contact } from '../contact/Contact.js';
import { InfoBox } from '../infoBox/InfoBox.ts';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent.ts';
import { LabeledUrlAvatar } from '../labeledUrlAvatar/LabeledUrlAvatar.ts';
import { style } from './SingleTeam.style.js';

const template = `
<details>
  <summary>
    <div class="summary-wrapper">
      <h2 class="team-name"></h2>
      <ul class="technologies-wrapper"></ul>
    </div>
  </summary>
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
  technologiesWrapper = this.shadowRoot.querySelector('.technologies-wrapper');
  descriptionWrapper = this.shadowRoot.querySelector('.description');
  lookingForWrapper = this.shadowRoot.querySelector('.looking-for');
  contacts = this.shadowRoot.querySelector(Contact.TAG);
  membersWrapper = this.shadowRoot.querySelector('.members');

  constructor(props) {
    super(template, style);
    this.initializeDate(props);
  }

  initializeDate({ contact, members, technologies, ...basic }) {
    this.nameWrapper.id = basic.name;
    this.nameWrapper.textContent = basic.name;
    this.addTechnologiesTags(technologies);
    this.descriptionWrapper.textContent = basic.description;
    this.lookingForWrapper.textContent = basic.lookingFor;
    this.contacts.setContacts(contact);
    this.addMembers(members);
  }

  addMembers(members) {
    if (members.length === 0) {
      const infoBox = new InfoBox('There are no team members yet!');
      this.membersWrapper.append(infoBox);
    }
    const allMembers = document.createDocumentFragment();
    for (const { name, avatarUrl } of members) {
      const singleMember = document.createElement('li');
      singleMember.className = 'member';
      singleMember.append(new LabeledUrlAvatar(name, avatarUrl));
      allMembers.append(singleMember);
    }
    this.membersWrapper.append(allMembers);
  }

  addTechnologiesTags(technologies) {
    const technologiesWrapper = document.createDocumentFragment();
    for (const technology of technologies) {
      const singleTechnology = document.createElement('li');
      singleTechnology.className = 'technology';
      singleTechnology.append(new Chip(technology));
      technologiesWrapper.append(singleTechnology);
    }
    this.technologiesWrapper.append(technologiesWrapper);
  }
}

customElements.define(SingleTeam.TAG, SingleTeam);
