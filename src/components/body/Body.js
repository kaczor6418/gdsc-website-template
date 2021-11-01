import { style } from './Body.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { Events } from '../events/Events.js';
import { Teams } from '../teams/Teams.js';

const template = `
  <main>
    <${Events.TAG}></${Events.TAG}>
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
