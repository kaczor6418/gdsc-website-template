import { CanNotChangeTab } from '../../errors/CanNotChangeTab';
import { Events } from '../events/Events';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';
import { KKBody } from './Body.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { style } from './Body.style';
import { TabName } from './Body.enum';

const template = `
<main>
  <${Events.TAG}></${Events.TAG}>
</main>
`;

export class Body extends KKWebComponent implements KKBody {
  static TAG = `kk-body`;

  private readonly bodyWrapper: HTMLElement = this.shadowRoot.querySelector('main') as HTMLElement;

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
    this.bodyWrapper.append(new Events());
  }

  private async setProjectsTab(): Promise<void> {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    const { Projects } = await import('../projects/Projects');
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new Projects());
  }

  private async setTeamsTab(): Promise<void> {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    const { Teams } = await import('../teams/Teams');
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new Teams());
  }

  private async setInfoTab(): Promise<void> {
    if (isNullOrUndefined(this.bodyWrapper.firstElementChild)) {
      throw new CanNotChangeTab('body wrapper is not defined');
    }
    const { Info } = await import('../info/Info');
    this.bodyWrapper.firstElementChild.remove();
    this.bodyWrapper.append(new Info());
  }
}

customElements.define(Body.TAG, Body);
