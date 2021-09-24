import { Header } from './components/heaedr/Header.js';
import { Footer } from './components/footer/Footer.js';
import { GDSCDataService } from "./services/GDSCEvents.js";
import { config } from '../config.js';
import { SingleEvent } from './components/singleEvent/SingleEvent.js';

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
const gdsData = new GDSCDataService(config.gdscClubRootUrl);
void gdsData.initializeData().then(() => {
  console.log(gdsData.getPastEvents());
  const upcommingEvents = gdsData.getUpcommingEvents();
  for(const event of upcommingEvents) {
    document.body.append(new SingleEvent({
      'kk-url': event.url,
      'kk-picture': event.imageUrl,
      'kk-title': event.title,
      'kk-date': event.date,
      'kk-description': event.description
    }));
  }
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

appFooter.addSocialMediaIcons(config.socialMedia);
appFooter.setCopyright({
  date: '2021',
  author: 'Krzysztof Kaczyński',
  termsReferenceUrl: 'https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website/blob/master/LICENSE'
});