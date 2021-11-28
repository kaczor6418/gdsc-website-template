export class GDSCDataService {
  gdscClubUrl = null;
  gdscData = null;
  contact = null;
  upcomingEvents = null;
  pastEvents = null;
  organizers = null;

  constructor() {
    void this.voidInitializeConfig();
  }

  async voidInitializeConfig() {
    this.configRequest = fetch('./assets/configs/config.json', {cache: 'force-cache'})
      .then(response => response.json().then())
      .then(({gdscClubRootUrl, contact}) => {
        this.gdscClubUrl = gdscClubRootUrl;
        this.contact = contact;
      });
  }

  async getContact() {
    await this.configRequest;
    return this.contact;
  }

  async getPastEvents() {
    if (this.gdscData === null) {
      await this.fetchRawData();
    }
    if (this.pastEvents !== null) {
      return this.pastEvents;
    }
    const rawPastEvents = this.gdscData?.querySelector('#past-events');
    if (rawPastEvents === null) {
      return [];
    }
    this.transformHtmlPastEventsToArrayOfEvents(rawPastEvents);
    return this.pastEvents;
  }

  async getUpcomingEvents() {
    if (this.gdscData === null) {
      await this.fetchRawData();
    }
    if (this.upcomingEvents !== null) {
      return this.upcomingEvents;
    }
    const rawUpcomingEvents = this.gdscData?.querySelector('#upcoming-events');
    if (rawUpcomingEvents.querySelector('strong').textContent.includes('There are no upcoming events')) {
      return [];
    }
    this.transformHtmlUpcomingEventsToArrayOfEvents(rawUpcomingEvents);
    return this.upcomingEvents;
  }

  async getOrganizers() {
    if (this.gdscData === null) {
      await this.fetchRawData();
    }
    if (this.organizers !== null) {
      return this.organizers;
    }
    const rawContacts = this.gdscData?.querySelector('#team-list');
    this.transformHtmlOrganizersToArrayOfContacts(rawContacts);
    return this.organizers;
  }

  async fetchRawData() {
    await this.configRequest;
    const response = await fetch(this.gdscClubUrl, {
      headers: {'Content-Type': 'text/html; charset=utf-8'}
    }).then(response => response.text());
    this.gdscData = new DOMParser().parseFromString(response, 'text/html');
  }

  async fetchSinglePastEventDescription(eventUrl) {
    const rawEvent = await fetch(eventUrl, {cache: 'force-cache'}).then(res => res.text());
    return new DOMParser().parseFromString(rawEvent, 'text/html')
      .querySelector('.event-short-description-on-banner')?.textContent
      ?? 'This event does not have short description';
  }

  transformHtmlPastEventsToArrayOfEvents(htmlEvents) {
    this.pastEvents = [];
    const eventsTitles = [];
    const eventsUrls = [];
    for (const event of Array.from(htmlEvents.querySelectorAll('a'))) {
      eventsTitles.push(event.title);
      eventsUrls.push(event.href.replace(window.location.host, 'gdsc.community.dev'));
    }
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map(image => image.src);
    const eventsDates = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-date')).map(date => date.textContent.trim());
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-type')).map(type => type.textContent.trim());
    for (let i = 0; i < eventsTitles.length; i++) {
      this.pastEvents.push({
        title: eventsTitles[i],
        url: eventsUrls[i],
        imageUrl: eventsImagesUrls[i],
        date: eventsDates[i],
        type: eventsTypes[i]
      });
    }
  }

  transformHtmlUpcomingEventsToArrayOfEvents(htmlEvents) {
    this.upcomingEvents = [];
    const eventsTitles = Array.from(htmlEvents.querySelectorAll('h4')).map(title => title.textContent);
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map(image => image.src);
    const eventsDates = Array.from(htmlEvents.querySelectorAll('strong')).map(date => date.textContent);
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('span')).map(type => type.textContent);
    const eventsUrls = Array.from(htmlEvents.querySelectorAll('a')).map(eventUrl => eventUrl.href.replace(window.location.host, 'gdsc.community.dev'));
    const eventsDescriptions = Array.from(htmlEvents.querySelectorAll('p')).map(description => description.textContent);
    for (let i = 0; i < eventsTitles.length; i++) {
      this.upcomingEvents.push({
        title: eventsTitles[i],
        url: eventsUrls[i],
        imageUrl: eventsImagesUrls[i],
        date: eventsDates[i],
        type: eventsTypes[i],
        description: eventsDescriptions[i]
      });
    }
  }

  transformHtmlOrganizersToArrayOfContacts(htmlOrganizers) {
    this.organizers = Array.from(htmlOrganizers.querySelectorAll('.people-card')).map(contact => {
      const {alt: name, src: avatar} = contact.querySelector('img');
      return {
        name,
        avatar,
        title: contact.querySelector('.people-card--title').textContent
      }
    });
  }
}