import { style } from './Events.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UpcommingEvent } from './UpcommingEvent.js';
import { InfoBox } from '../infoBox/InfoBox.js';

const template = `
  <section>
  <div>
  </div>
    <details class="upcomming-events-wrapper" open>
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

  constructor() {
    super(template, style);
  }

  setUpcommingEvents(events) {
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

  setPastEvents(events) {
    if(events.length === 0) {
      const infoBox = new InfoBox('There are no past events!');
      this.pastEventsWrapper.append(infoBox);
    } else {

    }
  }

}

customElements.define(Events.TAG, Events);
