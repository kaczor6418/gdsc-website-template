import { Body } from './components/body/Body';
import { Footer } from './components/footer/Footer';
import { gdscService } from './services/globalServices';
import { Header } from './components/heaedr/Header';
import { KKBody } from './components/body/Body.type';
import { KKFooter } from './components/footer/Footer.type';
import { KKHeader } from './components/heaedr/Header.type';
import { KKWebComponent } from './components/KKWebComponent/KKWebComponent';

const style = `
:host {
  height: 100%;
  display: flex;
  flex-direction: column;
}
${Body.TAG} {
  margin: 0;
  margin-bottom: auto;
}
`;

const template = `
<${Header.TAG}></${Header.TAG}>
<${Body.TAG}></${Body.TAG}>
<${Footer.TAG}></${Footer.TAG}>
`;

export class App extends KKWebComponent {
  static TAG = `kk-app`;

  private readonly header: KKHeader = this._shadowRoot.querySelector(Header.TAG) as KKHeader;
  private readonly body: KKBody = this._shadowRoot.querySelector(Body.TAG) as KKBody;
  private readonly footer: KKFooter = this._shadowRoot.querySelector(Footer.TAG) as KKFooter;

  constructor() {
    super(template, style);
    void this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    const clubName = await gdscService.getClubName();
    await this.header.initializeData({
      logo: 'gdsc',
      tabsProps: {
        activeTab: 'Events',
        tabs: [
          {
            changeTabCallback: (): void => {
              return void this.body.changeTab('Events');
            },
            disabled: false,
            name: 'Events',
          },
          {
            changeTabCallback: (): void => {
              return void this.body.changeTab('Info');
            },
            disabled: false,
            name: 'Info',
          },
          {
            changeTabCallback: (): void => {
              return void this.body.changeTab('Teams');
            },
            disabled: false,
            name: 'Teams',
          },
          {
            changeTabCallback: (): void => {
              return void this.body.changeTab('Projects');
            },
            disabled: false,
            name: 'Projects',
          },
        ],
      },
      title: clubName,
    });
    this.footer.setCopyright({
      author: 'Krzysztof Kaczyński',
      date: '2021',
      termsReferenceUrl: 'https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website/blob/master/LICENSE',
    });
  }
}

customElements.define(App.TAG, App);
