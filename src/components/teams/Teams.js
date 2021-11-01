import { style } from './Teams.style.js';
import { SingleTeam } from './SingleTeam.js';
import { KKWebComponent } from '../KKWebComponent.js';
import { InfoBox } from '../infoBox/InfoBox.js';

const template = `
<section class="teams">
</section>
`;

export class Teams extends KKWebComponent {
  static TAG = `kk-teams`;

  teams = [];
  teamsWrapper =  this.shadowRoot.querySelector('.teams');

  constructor() {
    super(template, style);
    void this.fetchTeams().then(() => this.renderTeams());
  }

  async fetchTeams() {
    const response = await fetch('./assets/configs/teams.json');
    this.teams = await response.json();
  }

  renderTeams() {
    if (this.teams.length === 0) {
      const infoBox = new InfoBox('There are no teams!');
      this.teamsWrapper.append(infoBox);
    } else {
      for (const singleTeam of this.teams) {
        this.teamsWrapper.append(new SingleTeam(singleTeam));
      }
    }
  }
}

customElements.define(Teams.TAG, Teams);
