import { Header } from './components/heaedr/Header.js';
import { Footer } from './components/footer/Footer.js';
import { Body } from './components/body/Body.js';
import { config } from '../config.js';

const appHeader = document.querySelector('kk-header');
const appFooter = document.querySelector('kk-footer');

void appHeader.setTitleAndLogo('GDSC - LODZ', 'logo');
appHeader.addNavigation({
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

appFooter.addSocialMediaIcons(config.socialMedia);
appFooter.setCopyright({
  date: '2021',
  author: 'Krzysztof Kaczyński',
  termsReferenceUrl: 'https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website/blob/master/LICENSE'
});