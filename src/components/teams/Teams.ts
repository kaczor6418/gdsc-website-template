import { InfoBox } from '../infoBox/InfoBox';
import { isEmptyArray } from '../../common/utils/isEmptyArray';
import { KKTeams } from './Teams.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { SingleTeam } from './SingleTeam/SingleTeam';
import { SingleTeamProps } from './SingleTeam/SingleTeam.type';
import { style } from './Teams.style';

const template = `
<section class="teams">
</section>
`;

export class Teams extends KKWebComponent implements KKTeams {
  static TAG = `kk-teams`;

  private readonly teamsWrapper: HTMLElement = this._shadowRoot.querySelector('.teams') as HTMLElement;

  constructor() {
    super(template, style);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this.fetchTeams().then(this.renderTeams);
  }

  public async fetchTeams(): Promise<SingleTeamProps[]> {
    const response = await fetch('./assets/configs/teams.json');
    return (await response.json()) as SingleTeamProps[];
  }

  private renderTeams = (teams: SingleTeamProps[]): void => {
    if (isEmptyArray(teams)) {
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
  };
}

customElements.define(Teams.TAG, Teams);
