import { gdscService } from '../../services/globalServices';
import { InfoBox } from '../../components/InfoBox/InfoBox';
import { isEmptyArray } from '../../common/utils/isEmptyArray';
import { KKClubEvents } from './ClubEvents.type';
import { KKWebComponent } from '../../components/KKWebComponent/KKWebComponent';
import { SingleEvent } from './SingleEvent/SingleEvent';
import { SingleEventObservedAttributes } from './SingleEvent/SingleEvent.enum';
import style from './ClubEvents.css';

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

export class ClubEvents extends KKWebComponent implements KKClubEvents {
  static TAG = `kk-club-events`;

  private readonly upcomingEventsWrapper: HTMLDetailsElement = this._shadowRoot.querySelector('.upcoming-events-wrapper') as HTMLDetailsElement;
  private readonly pastEventsWrapper: HTMLDetailsElement = this._shadowRoot.querySelector('.past-events-wrapper') as HTMLDetailsElement;

  constructor() {
    super(template, style);
    this.initializeListeners();
  }

  public async setUpcomingEvents(): Promise<void> {
    const events = await gdscService.getUpcomingEvents();
    if (isEmptyArray(events)) {
      const infoBox = new InfoBox('There are no upcoming events!');
      this.upcomingEventsWrapper.append(infoBox);
    } else {
      const eventsWrapper = document.createElement('ul');
      this.upcomingEventsWrapper.append(eventsWrapper);
      for (const event of events) {
        const eventWrapper = document.createElement('li');
        eventWrapper.append(
          new SingleEvent({
            [SingleEventObservedAttributes.KK_DATE]: event.date,
            [SingleEventObservedAttributes.KK_DESCRIPTION]: event.description,
            [SingleEventObservedAttributes.KK_PICTURE]: event.imageUrl,
            [SingleEventObservedAttributes.KK_TITLE]: event.title,
            [SingleEventObservedAttributes.KK_URL]: event.url,
          })
        );
        eventsWrapper.append(eventWrapper);
      }
    }
  }

  public async setPastEvents(): Promise<void> {
    const events = await gdscService.getPastEvents();
    if (isEmptyArray(events)) {
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
            [SingleEventObservedAttributes.KK_DATE]: event.date,
            [SingleEventObservedAttributes.KK_DESCRIPTION]: description,
            [SingleEventObservedAttributes.KK_PICTURE]: event.imageUrl,
            [SingleEventObservedAttributes.KK_TITLE]: event.title,
            [SingleEventObservedAttributes.KK_URL]: event.url,
          })
        );
        eventsWrapper.append(eventWrapper);
      }
    }
  }

  private initializeListeners(): void {
    const renderUpcomingEvents = (): void => {
      this.upcomingEventsWrapper.removeEventListener('click', renderUpcomingEvents);
      void this.setUpcomingEvents();
    };
    const renderPastEvents = (): void => {
      this.pastEventsWrapper.removeEventListener('click', renderPastEvents);
      void this.setPastEvents();
    };
    this.upcomingEventsWrapper.addEventListener('click', renderUpcomingEvents);
    this.pastEventsWrapper.addEventListener('click', renderPastEvents);
  }
}

customElements.define(ClubEvents.TAG, ClubEvents);
