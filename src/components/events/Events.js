import { style } from './Events.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { UpcommingEvent } from './UpcommingEvent.js';

const template = `
  <section>
    <details class="upcomming-events-wrapper" open>
      <summary><h2>Upcomming Events</h2></summary>
      <ul></ul>
    </details>
    <details class="past-events-wrapper">
      <summary><h2>Past events</h2></summary>
      <ul></ul>
    </details>
  </section>
`;

export class Events extends KKWebComponent {
  static TAG = `kk-events`;

  upcommingEventsWrapper = this.shadowRoot.querySelector('.upcomming-events-wrapper ul');
  pastEventsWrapper = this.shadowRoot.querySelector('.past-events-wrapper ul');

  constructor() {
    super(template, style);
  }

  setEvents(upcommingEvents, pastEvents) {
    this.upcommingEventsWrapper.append(this.createEvents(upcommingEvents));
    this.pastEventsWrapper.append(this.createEvents(pastEvents));
  }

  createEvents(events) {
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
    return allEvents;
  }

}

customElements.define(Events.TAG, Events);
