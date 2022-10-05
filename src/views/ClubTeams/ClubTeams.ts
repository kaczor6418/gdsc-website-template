import { InfoBox } from '../../components/InfoBox/InfoBox';
import { isEmptyArray } from '../../common/utils/isEmptyArray';
import type { KKClubTeams } from './ClubTeams.type';
import { KKWebComponent } from '../../components/KKWebComponent/KKWebComponent';
import { SingleTeam } from './SingleTeam/SingleTeam';
import type { SingleTeamProps } from './SingleTeam/SingleTeam.type';
import style from './ClubTeams.css';

const template = `
<section class="teams">
</section>
`;

export class ClubTeams extends KKWebComponent implements KKClubTeams {
  static TAG = `kk-club-teams`;

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

customElements.define(ClubTeams.TAG, ClubTeams);
