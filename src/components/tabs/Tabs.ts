import { KKTabs, TabProps, TabsProps } from './Tabs.type';
import { isDefined } from '../../common/utils/isDefined';
import { KKSingleTab } from './SingleTab/SingleTab.type';
import { KKTabIndicator } from './TabIndicator/TabIndicator.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { SingleTab } from './SingleTab/SingleTab';
import { style } from './Tabs.style';
import { TabIndicator } from './TabIndicator/TabIndicator';

const template = `
<ul role="tablist" class="tabs">
</ul>
`;

export class Tabs extends KKWebComponent implements KKTabs {
  static TAG = `kk-tabs`;

  private readonly tabsWrapper: HTMLUListElement = this._shadowRoot.querySelector('ul') as HTMLUListElement;
  private readonly tabIndicator: KKTabIndicator;
  private readonly tabNameTab: Map<string, KKSingleTab> = new Map();

  constructor(props?: TabsProps) {
    super(template, style);
    this.tabIndicator = new TabIndicator({ width: 0 });
    this.tabsWrapper.appendChild(this.tabIndicator);
    if (isDefined(props)) {
      this.initializeData(props);
    }
  }

  get tabs(): KKSingleTab[] {
    return Array.from(this.tabNameTab.values());
  }

  private initializeData({ tabs, activeTab }: TabsProps): void {
    this.addTabs(tabs);
    this.activateTab(activeTab);
  }

  public addTab(tabProps: TabProps): void {
    const fullWidth = 100;
    const externalCallback = tabProps.changeTabCallback;
    tabProps.changeTabCallback = (): void => {
      this.activateTab(tabProps.name);
      externalCallback();
    };
    const newTab: KKSingleTab = new SingleTab(tabProps, this.tabNameTab.size);
    this.tabNameTab.set(tabProps.name, newTab);
    this.appendTab(newTab);
    this.tabIndicator.changeWidth(fullWidth / this.tabNameTab.size);
  }

  public addTabs(tabs: TabProps[]): void {
    tabs.forEach((tab) => {
      this.addTab(tab);
    });
  }

  public activateTab(tabName: string): void {
    for (const tab of this.tabNameTab.values()) {
      if (tab.name === tabName) {
        tab.activate();
        this.tabIndicator.move(tab.index);
      } else {
        tab.deactivate();
      }
    }
  }

  private appendTab(tab: KKSingleTab): void {
    const li = document.createElement('li');
    li.setAttribute('role', 'tab');
    li.appendChild(tab);
    this.tabsWrapper.appendChild(li);
  }
}

customElements.define(Tabs.TAG, Tabs);
