import { HeaderProps, KKHeader } from './Header.type';
import { KKTabs, TabsProps } from '../../components/Tabs/Tabs.type';
import { Icon } from '../../components/Icon/Icon';
import { isDefined } from '../../common/utils/isDefined';
import { KKIcon } from '../../components/Icon/Icon.type';
import { KKWebComponent } from '../../components/KKWebComponent/KKWebComponent';
import style from './Header.css';
import { Tabs } from '../../components/Tabs/Tabs';

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

export class Header extends KKWebComponent implements KKHeader {
  static TAG = `kk-header`;

  private readonly headerWrapper: HTMLElement = this._shadowRoot.querySelector('header') as HTMLElement;
  private readonly headerTitle: HTMLHeadingElement = this._shadowRoot.querySelector('h1') as HTMLHeadingElement;
  private readonly icon: KKIcon = this._shadowRoot.querySelector(Icon.TAG) as KKIcon;

  constructor(props?: HeaderProps) {
    super(template, style);
    if (isDefined(props)) {
      void this.initializeData(props);
    }
  }

  public async initializeData({ logo, tabsProps, title }: HeaderProps): Promise<void> {
    if (isDefined(tabsProps)) {
      this.addNavigation(tabsProps);
    }
    await this.setTitleAndLogo(title, logo);
  }

  private async setTitleAndLogo(title: string, iconId: string): Promise<void> {
    this.headerTitle.textContent = title;
    await this.icon.setIcon(iconId);
  }

  private addNavigation(props: TabsProps): void {
    const headerNav = document.createElement('nav');
    const tabs: KKTabs = new Tabs(props);
    headerNav.appendChild(tabs);
    this.headerWrapper.appendChild(headerNav);
  }
}

customElements.define(Header.TAG, Header);
