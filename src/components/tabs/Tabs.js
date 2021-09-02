import { KKWebComponent } from '../KKWebComponent.js';
import { SingleTab } from './SingleTab.js';
import { TabIndicator } from './TabIndicator.js';

const template = `
<ul role="tablist" class="tabs">
</ul>
`;

export class Tabs extends KKWebComponent {
  static TAG = `kk-tabs`;

  tabsWrapper = this.shadowRoot.querySelector('ul');
  tabIndicator;

  tabNameTab = new Map();

  constructor() {
    super(template, import('./Tabs.style.js'));
    this.tabIndicator = new TabIndicator({ width: 0 });
    this.tabsWrapper.appendChild(this.tabIndicator);
  }

  get tabs() {
    return Array.from(this.tabNameTab.values());
  }

  initializeData({ tabs, activeTab }) {
    this.addTabs(tabs);
    this.activateTab(activeTab);
  }

  addTab(tabProps) {
    const externalCallback = tabProps.changeTabCallback;
    tabProps.changeTabCallback = () => {
      this.activateTab(tabProps.name);
      externalCallback();
    };
    const newTab = new SingleTab(tabProps, this.tabNameTab.size);
    this.tabNameTab.set(tabProps.name, newTab);
    this.appendTab(newTab);
    this.tabIndicator.changeWidth(100 / this.tabNameTab.size);
  }

  addTabs(tabs) {
    tabs.forEach((tab) => this.addTab(tab));
  }

  activateTab(tabName) {
    for (const tab of this.tabNameTab.values()) {
      if (tab.name === tabName) {
        tab.activate();
        this.tabIndicator.move(tab.index);
      } else {
        tab.deactivate();
      }
    }
  }

  appendTab(tab) {
    const li = document.createElement('li');
    li.setAttribute('role', 'tab');
    li.appendChild(tab);
    this.tabsWrapper.appendChild(li);
  }
}

customElements.define(Tabs.TAG, Tabs);
