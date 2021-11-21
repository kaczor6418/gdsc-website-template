import { style } from './ClubInfo.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { gdscService } from '../../services/globalServices.js';

const template = `
<section class="core-team">
</section>
<section class="club-contact"></section>
`;

export class ClubInfo extends KKWebComponent {
  static TAG = `kk-club-contact`;

  constructor() {
    super(template, style);
    void this.setClubContact();
  }

  async setClubContact() {
    const contacts = await gdscService.getContacts();
    console.log(contacts);
  }
}

customElements.define(ClubInfo.TAG, ClubInfo);
