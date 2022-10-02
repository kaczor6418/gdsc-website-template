import { KKSingleTeam, SingleTeamProps } from './SingleTeam.type';
import { Chip } from '../../chip/Chip';
import { ClubMember } from '../../../common/types';
import { Contact } from '../../contact/Contact';
import { InfoBox } from '../../infoBox/InfoBox';
import { isEmptyArray } from '../../../common/utils/isEmptyArray';
import { KKContact } from '../../contact/Contact.type';
import { KKWebComponent } from '../../KKWebComponent/KKWebComponent';
import { LabeledUrlAvatar } from '../../labeledUrlAvatar/LabeledUrlAvatar';
import { style } from './SingleTeam.style';

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

export class SingleTeam extends KKWebComponent implements KKSingleTeam {
  static TAG = `kk-single-team`;

  private readonly nameWrapper: HTMLHeadingElement = this._shadowRoot.querySelector('.team-name') as HTMLHeadingElement;
  private readonly technologiesWrapper: HTMLUListElement = this._shadowRoot.querySelector('.technologies-wrapper') as HTMLUListElement;
  private readonly descriptionWrapper: HTMLParagraphElement = this._shadowRoot.querySelector('.description') as HTMLParagraphElement;
  private readonly lookingForWrapper: HTMLParagraphElement = this._shadowRoot.querySelector('.looking-for') as HTMLParagraphElement;
  private readonly contacts: KKContact = this._shadowRoot.querySelector(Contact.TAG) as KKContact;
  private readonly membersWrapper: HTMLElement = this._shadowRoot.querySelector('.members') as HTMLElement;

  constructor(props: SingleTeamProps) {
    super(template, style);
    this.initializeDate(props);
  }

  public initializeDate({ contact, members, technologies, ...basic }: SingleTeamProps): void {
    this.nameWrapper.id = basic.name;
    this.nameWrapper.textContent = basic.name;
    this.addTechnologiesTags(technologies);
    this.descriptionWrapper.textContent = basic.description;
    this.lookingForWrapper.textContent = basic.lookingFor;
    this.contacts.setContacts(contact);
    this.addMembers(members);
  }

  private addMembers(members: ClubMember[]): void {
    if (isEmptyArray(members)) {
      const infoBox = new InfoBox('There are no team members yet!');
      this.membersWrapper.append(infoBox);
    }
    const allMembers = document.createDocumentFragment();
    for (const { name, avatar, url } of members) {
      const singleMember = document.createElement('li');
      singleMember.className = 'member';
      singleMember.append(new LabeledUrlAvatar(name, avatar, url ?? '#'));
      allMembers.append(singleMember);
    }
    this.membersWrapper.append(allMembers);
  }

  private addTechnologiesTags(technologies: string[]): void {
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
