import { style } from './ClubContact.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { gdscService } from '../../services/globalServices.js';

const template = ``;

export class ClubContact extends KKWebComponent {
  static TAG = `kk-club-contact`;

  constructor() {
    super(template, style);
    void this.setClubContact();
  }

  async setClubContact() {
    const contacts = await gdscService.getContacts();
  }
}

customElements.define(ClubContact.TAG, ClubContact);
