import { style } from './Events.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UpcomingEvent } from './UpcomingEvent.js';
import { InfoBox } from '../infoBox/InfoBox.js';
import { gdscService } from '../../services/globalServices.js';

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
      this.upcomingEventsWrapper.removeEventListener('click', renderUpcomingEvents)
      void this.setUpcomingEvents();
    }
    const renderPastEvents = () => {
      this.pastEventsWrapper.removeEventListener('click', renderPastEvents);
      void this.setPastEvents();
    }
    this.upcomingEventsWrapper.addEventListener('click', renderUpcomingEvents);
    this.pastEventsWrapper.addEventListener('click', renderPastEvents);
  }

  async setUpcomingEvents() {
    const events = await gdscService.getUpcomingEvents();
    if(events.length === 0) {
      const infoBox = new InfoBox('There are no upcoming events!');
      this.upcomingEventsWrapper.append(infoBox);
    } else {
      const eventsWrapper = document.createElement('ul');
      const allEvents = document.createDocumentFragment();
      for (const event of events) {
        const eventWrapper = document.createElement('li');
        eventWrapper.append(new UpcomingEvent({
          'kk-url': event.url,
          'kk-picture': event.imageUrl,
          'kk-title': event.title,
          'kk-date': event.date,
          'kk-description': event.description
        }));
        allEvents.append(eventWrapper);
      }
      eventsWrapper.append(allEvents);
      this.upcomingEventsWrapper.append(eventsWrapper);
    }
  }

  async setPastEvents() {
    const events = await gdscService.getPastEvents();
    if(events.length === 0) {
      const infoBox = new InfoBox('There are no past events!');
      this.pastEventsWrapper.append(infoBox);
    } else {

    }
  }

}

customElements.define(Events.TAG, Events);
