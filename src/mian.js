import { Header } from './components/heaedr/Header.js';
import { Footer } from './components/footer/Footer.js';
import { GDSCDataService } from "./services/GDSCEvents.js";

const toggleThemeButton = document.querySelector('#toggle-theme');
const appHeader = document.querySelector('kk-header');
const appFooter = document.querySelector('kk-footer');
const root = document.firstElementChild;

window.onload = () => {
  const savedTheme = localStorage.getItem('THEME');
  root.setAttribute('color-scheme', savedTheme ?? 'dark');
};

// toggleThemeButton.addEventListener('click', () => {
//   const currentTheme = root.getAttribute('color-scheme');
//   const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//   root.setAttribute('color-scheme', newTheme);
// });
const gdsData = new GDSCDataService();
gdsData.initializeData().then(() => {
  console.log(gdsData.getPastEvents());
  console.log(gdsData.getUpcommingEvents());
});

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

appFooter.addSocialMediaIcons([
  {iconId: 'facebook', url: 'https://www.facebook.com/GDSC-%C5%81%C3%B3d%C5%BA-110179034737749'},
  {iconId: 'twitter', url: 'https://twitter.com/GdscLodz'},
  {iconId: 'github', url: 'https://github.com/GDSC-Lodz-University-of-Technology'}
]);
appFooter.setCopyright({
  date: '2021',
  author: 'Krzysztof Kaczyński',
  termsReferenceUrl: 'https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website/blob/master/LICENSE'
});