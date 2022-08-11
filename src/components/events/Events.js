import { gdscService } from '../../services/globalServices.ts';
import { InfoBox } from '../infoBox/InfoBox.js';
import { KKWebComponent } from '../KKWebComponent.js';
import { style } from './Events.style.js';
import { SingleEvent } from './SingleEvent.js';

const template = `
  <section>
    <details class="upcoming-events-wrapper">
      <summary><h2>Upcoming Events</h2></summary>
    </details>
    <details class="past-events-wrapper">
      <summary><h2>Past events</h2></summary>
    </details>
  </section>
`;

export class Events extends KKWebComponent {
  static TAG = `kk-events`;

  upcomingEventsWrapper = this.shadowRoot.querySelector('.upcoming-events-wrapper');
  pastEventsWrapper = this.shadowRoot.querySelector('.past-events-wrapper');

  constructor() {
    super(template, style);
    this.initializeListeners();
  }

  initializeListeners() {
    const renderUpcomingEvents = () => {
      this.upcomingEventsWrapper.removeEventListener('click', renderUpcomingEvents);
      void this.setUpcomingEvents();
    };
    const renderPastEvents = () => {
      this.pastEventsWrapper.removeEventListener('click', renderPastEvents);
      void this.setPastEvents();
    };
    this.upcomingEventsWrapper.addEventListener('click', renderUpcomingEvents);
    this.pastEventsWrapper.addEventListener('click', renderPastEvents);
  }

  async setUpcomingEvents() {
    const events = await gdscService.getUpcomingEvents();
    if (events.length === 0) {
      const infoBox = new InfoBox('There are no upcoming events!');
      this.upcomingEventsWrapper.append(infoBox);
    } else {
      const eventsWrapper = document.createElement('ul');
      this.upcomingEventsWrapper.append(eventsWrapper);
      for (const event of events) {
        const eventWrapper = document.createElement('li');
        eventWrapper.append(
          new SingleEvent({
            'kk-url': event.url,
            'kk-picture': event.imageUrl,
            'kk-title': event.title,
            'kk-date': event.date,
            'kk-description': event.description,
          })
        );
        eventsWrapper.append(eventWrapper);
      }
    }
  }

  async setPastEvents() {
    const events = await gdscService.getPastEvents();
    if (events.length === 0) {
      const infoBox = new InfoBox('There are no past events!');
      this.pastEventsWrapper.append(infoBox);
    } else {
      const eventsWrapper = document.createElement('ul');
      this.pastEventsWrapper.append(eventsWrapper);
      for (const event of events) {
        const eventWrapper = document.createElement('li');
        const description = await gdscService.fetchSinglePastEventDescription(event.url);
        eventWrapper.append(
          new SingleEvent({
            'kk-url': event.url,
            'kk-picture': event.imageUrl,
            'kk-title': event.title,
            'kk-date': event.date,
            'kk-description': description,
          })
        );
        eventsWrapper.append(eventWrapper);
      }
    }
  }
}

customElements.define(Events.TAG, Events);
