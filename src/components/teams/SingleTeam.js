import { style } from './SingleTeam.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = `
  <details>
    <summary><h2 class="team-name"></h2></summary>
    <div>
      <section>
        <h3>Description</h3>
        <p class="description"></p>
      </section>
    </div>
  </details>
`;

export class SingleTeam extends KKWebComponent {
  static TAG = `kk-single-team`;
  nameWrapper = this.shadowRoot.querySelector('.team-name');
  descriptionWrapper = this.shadowRoot.querySelector('.description');

  constructor(props) {
    super(template, style);
    this.initializeDate(props);
  }

  initializeDate({contact, members, ...basic}) {
    this.nameWrapper.textContent = basic.name;
    this.descriptionWrapper.textContent = basic.description;
  }
}

customElements.define(SingleTeam.TAG, SingleTeam);
