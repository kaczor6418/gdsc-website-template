import {style} from './Header.style.js';
import { Icon } from "../icon/Icon.js";
import { KKWebComponent } from "../KKWebComponent.js";
import { Tabs } from "../tabs/Tabs.js";

const template = `
<header>
  <section>
    <div class="logo-title">
    <${Icon.TAG}></${Icon.TAG}>
      <h1></h1>
    </div>
  </section>
</header>
`;

export class Header extends KKWebComponent {
  static TAG = `kk-header`;

  headerWrapper = this.shadowRoot.querySelector('header');
  headerTitle = this.shadowRoot.querySelector('h1');
  icon = this.shadowRoot.querySelector(Icon.TAG);

  constructor() {
    super(template, style);
  }

  addNavigation(props) {
    const headerNav = document.createElement('nav');
    const tabs = new Tabs();
    tabs.initializeData(props);
    headerNav.appendChild(tabs);
    this.headerWrapper.appendChild(headerNav);
  }

  initializeData({ logo, tabsProps, title }) {
    this.setTitleAndLogo(title, logo);
    if (tabsProps != null) {
      this.addNavigation(tabsProps);
    }
  }

  async setTitleAndLogo(title, iconId) {
    this.headerTitle.textContent = title;
    await this.icon.setIcon(iconId);
  }
}

customElements.define(Header.TAG, Header);
