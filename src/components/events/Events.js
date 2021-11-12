import { style } from './Events.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UpcommingEvent } from './UpcommingEvent.js';
import { InfoBox } from '../infoBox/InfoBox.js';
import { gdscService } from '../../services/globalServices.js';

const template = `
  <section>
    <details class="upcomming-events-wrapper">
      <summary><h2>Upcomming Events</h2></summary>
    </details>
    <details class="past-events-wrapper">
      <summary><h2>Past events</h2></summary>
    </details>
  </section>
`;

export class Events extends KKWebComponent {
  static TAG = `kk-events`;

  upcommingEventsWrapper = this.shadowRoot.querySelector('.upcomming-events-wrapper');
  pastEventsWrapper = this.shadowRoot.querySelector('.past-events-wrapper');
  upcommingEventsRendered = false;
  pastEventsRendered = false;

  constructor() {
    super(template, style);
    this.initializeListeners();
  }

  initializeListeners() {
    const renderUpcommingEvents = () => {
      this.upcommingEventsWrapper.removeEventListener('click', renderUpcommingEvents)
      void this.setUpcommingEvents();
    }
    const renderPastEvents = () => {
      this.pastEventsWrapper.removeEventListener('click', renderPastEvents);
      void this.setPastEvents();
    }
    this.upcommingEventsWrapper.addEventListener('click', renderUpcommingEvents);
    this.pastEventsWrapper.addEventListener('click', renderPastEvents);
  }

  async setUpcommingEvents() {
    const events = await gdscService.getUpcomingEvents();
    if(events.length === 0) {
      const infoBox = new InfoBox('There are no upcomming events!');
      this.upcommingEventsWrapper.append(infoBox);
    } else {
      const eventsWrapper = document.createElement('ul');
      const allEvents = document.createDocumentFragment();
      for (const event of events) {
        const eventWrapper = document.createElement('li');
        eventWrapper.append(new UpcommingEvent({
          'kk-url': event.url,
          'kk-picture': event.imageUrl,
          'kk-title': event.title,
          'kk-date': event.date,
          'kk-description': event.description
        }));
        allEvents.append(eventWrapper);
      }
      eventsWrapper.append(allEvents);
      this.upcommingEventsWrapper.append(eventsWrapper);
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
