
import { style } from './Events.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { SingleEvent } from '../singleEvent/SingleEvent.js';

const template = `
  <section>
    <details class="upcomming-events-wrapper" open>
      <summary>Upcomming Events</summary>
      <ul></ul>
    </details>
    <details class="past-events-wrapper">
      <summary>Past events</summary>
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
      eventWrapper.append(new SingleEvent({
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
