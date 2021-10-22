import { loadWholeStreamAsString } from '../utils.js';

export class GDSCDataService {
  gdscData;
  gdscClubUrl;
  upcommingEvents = null;
  pastEvents = null;

  constructor(gdscClubUrl) {
    this.gdscClubUrl = gdscClubUrl;
  }

  async initializeData() {
    const response = await fetch(this.gdscClubUrl, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }).then(response => response.body).then(body => loadWholeStreamAsString(body));
    this.gdscData = new DOMParser().parseFromString(response, 'text/html');
  }

  getPastEvents() {
    if (this.pastEvents !== null) {
      return this.pastEvents;
    }
    const rawPastEvents = this.gdscData?.querySelector('#past-events');
    if (rawPastEvents === null) {
      return [];
    }
    return this.htmlPastEventsToArrayOfEvents(rawPastEvents);
  }

  getUpcommingEvents() {
    if (this.upcommingEvents !== null) {
      return this.upcommingEvents;
    }
    const rawUpcomingEvents = this.gdscData?.querySelector('#upcoming-events');
    if (rawUpcomingEvents.querySelector('strong').textContent.includes('There are no upcoming events')) {
      return [];
    }
    return this.htmlUpcomingEventsToArrayOfEvents(rawUpcomingEvents);
  }

  htmlPastEventsToArrayOfEvents(htmlEvents) {
    const eventsTitles = [];
    const eventsUrls = [];
    for (const event of Array.from(htmlEvents.querySelectorAll('a'))) {
      eventsTitles.push(event.title);
      eventsUrls.push(event.href.replace(window.location.host, 'gdsc.community.dev'));
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

  htmlUpcomingEventsToArrayOfEvents(htmlEvents) {
    const eventsTitles = Array.from(htmlEvents.querySelectorAll('h4')).map(title => title.textContent);
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map(image => image.src);
    const eventsDates = Array.from(htmlEvents.querySelectorAll('strong')).map(date => date.textContent);
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('span')).map(type => type.textContent);
    const eventsUrls = Array.from(htmlEvents.querySelectorAll('a')).map(eventUrl => eventUrl.href.replace(window.location.host, 'gdsc.community.dev'));
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