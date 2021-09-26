
import { style } from './Body.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { GDSCDataService } from '../../services/GDSCEvents.js';
import { config } from '../../../config.js';
import { Events } from '../events/Events.js';

const template = `
  <main>
    <${Events.TAG}></${Events.TAG}>
  </main>
`;

export class Body extends KKWebComponent {
  static TAG = `kk-body`;

  eventsWrapper = this.shadowRoot.querySelector(Events.TAG);
  gdscService = new GDSCDataService(config.gdscClubRootUrl);

  constructor() {
    super(template, style);
    void this.initialize();
  }

  async initialize() {
    await this.gdscService.initializeData();
    this.eventsWrapper.setEvents(this.gdscService.getUpcommingEvents(), this.gdscService.getPastEvents());
  }
}

customElements.define(Body.TAG, Body);
