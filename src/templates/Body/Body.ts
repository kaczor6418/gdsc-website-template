import { CanNotChangeTab } from '../../errors/CanNotChangeTab';
import { ClubEvents } from '../../views/ClubEvents/ClubEvents';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';
import { KKBody } from './Body.type';
import { KKWebComponent } from '../../components/KKWebComponent/KKWebComponent';
import style from './Body.css';
import { TabName } from './Body.enum';

const template = `
<main>
  <${ClubEvents.TAG}></${ClubEvents.TAG}>
</main>
`;

export class Body extends KKWebComponent implements KKBody {
  static TAG = `kk-body`;

  private readonly bodyWrapper: HTMLElement = this._shadowRoot.querySelector('main') as HTMLElement;

  constructor() {
    super(template, style);
  }

  public async changeTab(tabName: string): Promise<void> {
    switch (tabName) {
      case TabName.EVENTS:
        this.setEventsTab();
        break;
      case TabName.PROJECTS:
        await this.setProjectsTab();
        break;
      case TabName.TEAMS:
        await this.setTeamsTab();
        break;
      case TabName.INFO:
        await this.setInfoTab();
        break;
      default:
        throw new CanNotChangeTab(`there is no tab with this name: ${tabName}`);
    }
  }

  private setEventsTab(): void {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new ClubEvents());
  }

  private async setProjectsTab(): Promise<void> {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    const { ClubProjects } = await import('../../views/ClubProjects/ClubProjects');
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new ClubProjects());
  }

  private async setTeamsTab(): Promise<void> {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    const { ClubTeams } = await import('../../views/ClubTeams/ClubTeams');
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new ClubTeams());
  }

  private async setInfoTab(): Promise<void> {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    const { ClubDescription } = await import('../../views/ClubDescription/ClubDescription');
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new ClubDescription());
  }
}

customElements.define(Body.TAG, Body);
