import { InfoBox } from '../infoBox/InfoBox.js';
import { KKWebComponent } from '../KKWebComponent.js';
import { SingleTeam } from './SingleTeam.js';
import { style } from './Teams.style.js';

const template = `
<section class="teams">
</section>
`;

export class Teams extends KKWebComponent {
  static TAG = `kk-teams`;

  teamsWrapper = this.shadowRoot.querySelector('.teams');

  constructor() {
    super(template, style);
  }

  connectedCallback() {
    super.connectedCallback();
    void this.fetchTeams().then(this.renderTeams);
  }

  async fetchTeams() {
    const response = await fetch('./assets/configs/teams.json');
    return await response.json();
  }

  renderTeams = (teams) => {
    if (teams.length === 0) {
      const infoBox = new InfoBox('There are no teams!');
      this.teamsWrapper.append(infoBox);
    } else {
      const teamsList = document.createElement('ul');
      const allTeams = document.createDocumentFragment();
      for (const singleTeam of teams) {
        const teamElement = document.createElement('li');
        teamElement.className = 'team';
        teamElement.append(new SingleTeam(singleTeam));
        allTeams.append(teamElement);
      }
      teamsList.append(allTeams);
      this.teamsWrapper.append(teamsList);
    }
  }
}

customElements.define(Teams.TAG, Teams);
