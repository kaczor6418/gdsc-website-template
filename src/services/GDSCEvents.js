import { GDSC_CLUB_ROOT_URL } from '../constants.js';
import { loadWholeStreamAsString } from '../utils.js';

export class GDSCDataService {
  #gdscData;

  async initializeData() {
    const response = await fetch(GDSC_CLUB_ROOT_URL, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }).then(response => response.body).then(body => loadWholeStreamAsString(body));
    this.#gdscData = new DOMParser().parseFromString(response, 'text/html');
  }

  getPastEvents() {
    const pastEvents = this.#gdscData?.querySelector('#past-events');
    if (pastEvents === null) {
      return [];
    }
    return this.#htmlPastEventsToArrayOfEvents(pastEvents);
  }

  getUpcommingEvents() {
    const upcomingEvents = this.#gdscData?.querySelector('#upcoming-events');
    if (upcomingEvents.querySelector('strong').textContent.includes('There are no upcoming events')) {
      return [];
    }
    return this.#htmlUpcomingEventsToArrayOfEvents(upcomingEvents);
  }

  #htmlPastEventsToArrayOfEvents(htmlEvents) {
    const eventsTitles = [];
    const eventsUrls = [];
    for (const event of Array.from(htmlEvents.querySelectorAll('a'))) {
      eventsTitles.push(event.title);
      eventsUrls.push(event.href.replace(window.location.href, 'https://gdsc.community.dev/'));
    }
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map(image => image.src);
    const eventsDates = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-date')).map(date => date.textContent.trim());
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-type')).map(type => type.textContent.trim());
    const parsedEvents = [];
    for (let i = 0; i < eventsTitles.length; i++) {
      parsedEvents.push({
        title: eventsTitles[i],
        url: eventsUrls[i],
        imageUrl: eventsImagesUrls[i],
        date: eventsDates[i],
        type: eventsTypes[i]
      });
    }
    return parsedEvents;
  }

  #htmlUpcomingEventsToArrayOfEvents(htmlEvents) {
    const eventsTitles = Array.from(htmlEvents.querySelectorAll('h4')).map(title => title.textContent);
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map(image => image.src);
    const eventsDates = Array.from(htmlEvents.querySelectorAll('strong')).map(date => date.textContent);
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('span')).map(type => type.textContent);
    const eventsUrls = Array.from(htmlEvents.querySelectorAll('a')).map(eventUrl => eventUrl.href.replace(window.location.href, 'https://gdsc.community.dev/'));
    const eventsTags = Array.from(htmlEvents.querySelectorAll('div[data-tags]')).map(tags => tags.getAttribute('data-tags').split(' / '));
    const eventsDescriptions = Array.from(htmlEvents.querySelectorAll('p')).map(description => description.textContent);
    const parsedEvents = [];
    for (let i = 0; i < eventsTitles.length; i++) {
      parsedEvents.push({
        title: eventsTitles[i],
        url: eventsUrls[i],
        imageUrl: eventsImagesUrls[i],
        date: eventsDates[i],
        type: eventsTypes[i],
        tags: eventsTags[i],
        description: eventsDescriptions[i]
      });
    }
    return parsedEvents;
  }
}