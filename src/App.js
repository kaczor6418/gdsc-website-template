import { Body } from "./components/body/Body.js";
import { Header } from "./components/heaedr/Header.js";
import { Footer } from "./components/footer/Footer.js";
import { KKWebComponent } from "./components/KKWebComponent.js";
import { gdscService } from "./services/globalServices.js";

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
`

const template = `
<${Header.TAG}></${Header.TAG}>
<${Body.TAG}></${Body.TAG}>
<${Footer.TAG}></${Footer.TAG}>
`;

export class App extends KKWebComponent {
  static TAG = `kk-app`;

  header = this.shadowRoot.querySelector(Header.TAG);
  body = this.shadowRoot.querySelector(Body.TAG);
  footer = this.shadowRoot.querySelector(Footer.TAG);

  constructor() {
    super(template, style);
    void this.initializeApp();
  }

  async initializeApp() {
    await this.header.setTitleAndLogo('GDSC - LODZ', 'logo');
    this.header.addNavigation({
      tabs: [
        {
          name: 'Events',
          changeTabCallback: () => console.log('Move to events'),
          disabled: false
        },
        {
          name: 'Contact',
          changeTabCallback: () => console.log('Move to contacts'),
          disabled: false
        },
        {
          name: 'Teams',
          changeTabCallback: () => console.log('Move to teams'),
          disabled: false
        },
        {
          name: 'Projects',
          changeTabCallback: () => console.log('Move to projects'),
          disabled: false
        }
      ],
      activeTab: 'Events'
    });
    const socialMedia = await gdscService.getSocialMedia();
    this.footer.addSocialMediaIcons(socialMedia);
    this.footer.setCopyright({
      date: '2021',
      author: 'Krzysztof Kaczyński',
      termsReferenceUrl: 'https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website/blob/master/LICENSE'
    });
  }
}

customElements.define(App.TAG, App);