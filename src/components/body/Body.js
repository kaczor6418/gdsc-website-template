import { style } from './Body.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { Events } from '../events/Events.js';
import { Teams } from '../teams/Teams.js';
import { Projects } from '../projects/Projects.js';

const template = `
  <main>
    <!-- <${Events.TAG}></${Events.TAG}> -->
    <!-- <${Projects.TAG}></${Projects.TAG}> -->
    <${Teams.TAG}></${Teams.TAG}>
  </main>
`;

export class Body extends KKWebComponent {
  static TAG = `kk-body`;

  eventsWrapper = this.shadowRoot.querySelector(Events.TAG);
  gdscService;

  constructor() {
    super(template, style);
  }
}

customElements.define(Body.TAG, Body);
