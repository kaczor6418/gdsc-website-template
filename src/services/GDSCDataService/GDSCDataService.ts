import type { ContactMedia, TemplateConfig } from '../../common/types';
import type { GDSCPastEvent, GDSCTeamMember, GDSCUpcomingEvent, IGDSCDataService } from './GDSCDataService.type';
import { CouldNotFetchConfigError } from '../../errors/CouldNotFetchConfigError';
import { CouldNotFetchDataError } from '../../errors/CouldNotFetchDataError';
import { isDefined } from '../../common/utils/isDefined';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';

export class GDSCDataService implements IGDSCDataService {
  private gdscClubUrl: string | null = null;
  private clubName: string | null = null;
  private gdscData: Document | null = null;
  private contact: ContactMedia[] | null = null;
  private upcomingEvents: GDSCUpcomingEvent[] | null = null;
  private pastEvents: GDSCPastEvent[] | null = null;
  private organizers: GDSCTeamMember[] | null = null;
  private description: string | null = null;
  private configRequest: Promise<Response> | null = null;
  private dataRequest: Promise<Response> | null = null;

  constructor() {
    void this.voidInitializeConfig();
  }

  public async getContact(): Promise<ContactMedia[]> {
    await this.configRequest;
    return this.contact ?? [];
  }

  public async getClubName(): Promise<string> {
    await this.configRequest;
    if (isNullOrUndefined(this.clubName)) {
      throw new Error('asc');
    }
    return this.clubName;
  }

  public async getPastEvents(): Promise<GDSCPastEvent[]> {
    if (isNullOrUndefined(this.gdscData)) {
      await this.fetchRawData();
    }
    if (isDefined(this.pastEvents)) {
      return this.pastEvents;
    }
    const rawPastEvents = this.gdscData?.querySelector('#past-events');
    if (isNullOrUndefined(rawPastEvents)) {
      return [];
    }
    this.pastEvents = this.transformHtmlPastEventsToArrayOfEvents(rawPastEvents);
    return this.pastEvents;
  }

  public async getUpcomingEvents(): Promise<GDSCUpcomingEvent[]> {
    if (isNullOrUndefined(this.gdscData)) {
      await this.fetchRawData();
    }
    if (isDefined(this.upcomingEvents)) {
      return this.upcomingEvents;
    }
    const rawUpcomingEvents = this.gdscData?.querySelector('#upcoming-events');
    if (isNullOrUndefined(rawUpcomingEvents) || rawUpcomingEvents?.querySelector('strong')?.textContent?.includes('There are no upcoming events')) {
      return [];
    }
    this.upcomingEvents = this.transformHtmlUpcomingEventsToArrayOfEvents(rawUpcomingEvents);
    return this.upcomingEvents;
  }

  public async getOrganizers(): Promise<GDSCTeamMember[]> {
    if (isNullOrUndefined(this.gdscData)) {
      await this.fetchRawData();
    }
    if (isDefined(this.organizers)) {
      return this.organizers;
    }
    const rawContacts = this.gdscData?.querySelector('#team-list');
    if (isNullOrUndefined(rawContacts)) {
      return [];
    }
    this.organizers = this.transformHtmlOrganizersToArrayOfContacts(rawContacts);
    return this.organizers;
  }

  public async getDescription(): Promise<string> {
    if (isNullOrUndefined(this.description)) {
      await this.fetchRawData();
    }
    if (isDefined(this.description)) {
      return this.description;
    }
    this.description = this.gdscData?.querySelector('#about .general-body')?.innerHTML ?? '';
    return this.description;
  }

  public async fetchSinglePastEventDescription(eventUrl: string): Promise<string> {
    const rawEvent = await fetch(eventUrl, { cache: 'force-cache' }).then((res) => {
      return res.text();
    });
    const eventShortDescription = new DOMParser().parseFromString(rawEvent, 'text/html').querySelector('.event-short-description-on-banner');
    return eventShortDescription?.textContent ?? 'This event does not have short description';
  }

  private async voidInitializeConfig(): Promise<void> {
    this.configRequest = fetch('./assets/configs/config.json', { cache: 'force-cache' });
    try {
      const response = await this.configRequest;
      const templateConfig = response.json().then() as unknown as TemplateConfig;
      this.gdscClubUrl = templateConfig.gdscClubRootUrl;
      this.clubName = templateConfig.clubName;
      this.contact = templateConfig.contact;
    } catch (e) {
      throw new CouldNotFetchConfigError(e as Error);
    }
  }

  private async fetchRawData(): Promise<Document> {
    await this.configRequest;
    if (isNullOrUndefined(this.gdscClubUrl)) {
      throw new CouldNotFetchDataError('GDSC club url is undefined');
    }
    if (isNullOrUndefined(this.dataRequest)) {
      this.dataRequest = fetch(this.gdscClubUrl, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    const dataResponse = await this.dataRequest;
    const dataRawText = await dataResponse.text();
    this.gdscData = new DOMParser().parseFromString(dataRawText, 'text/html');
    return this.gdscData;
  }

  private transformHtmlPastEventsToArrayOfEvents(htmlEvents: Element): GDSCPastEvent[] {
    const pastEvents: GDSCPastEvent[] = [];
    const eventsTitles: string[] = [];
    const eventsUrls: string[] = [];
    for (const event of Array.from(htmlEvents.querySelectorAll('a'))) {
      eventsTitles.push(event.title);
      eventsUrls.push(event.href.replace(window.location.host, 'gdsc.community.dev'));
    }
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map((image) => {
      return image.src;
    });
    const eventsDates = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-date')).map((date) => {
      return date.textContent?.trim() ?? 'NO DATE';
    });
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('.vertical-box--event-type')).map((type) => {
      return type.textContent?.trim();
    });
    for (let i = 0; i < eventsTitles.length; i++) {
      pastEvents.push({
        date: eventsDates[i],
        imageUrl: eventsImagesUrls[i],
        title: eventsTitles[i],
        type: eventsTypes[i],
        url: eventsUrls[i],
      });
    }
    return pastEvents;
  }

  private transformHtmlUpcomingEventsToArrayOfEvents(htmlEvents: Element): GDSCUpcomingEvent[] {
    const upcomingEvents: GDSCUpcomingEvent[] = [];
    const eventsTitles = Array.from(htmlEvents.querySelectorAll('h4')).map((title) => {
      return title.textContent ?? 'NO TITLE';
    });
    const eventsImagesUrls = Array.from(htmlEvents.querySelectorAll('img')).map((image) => {
      return image.src;
    });
    const eventsDates = Array.from(htmlEvents.querySelectorAll('strong')).map((date) => {
      return date.textContent ?? 'NO DATE';
    });
    const eventsTypes = Array.from(htmlEvents.querySelectorAll('span')).map((type) => {
      return type.textContent?.trim();
    });
    const eventsUrls = Array.from(htmlEvents.querySelectorAll('a')).map((eventUrl) => {
      return eventUrl.href.replace(window.location.host, 'gdsc.community.dev');
    });
    const eventsDescriptions = Array.from(htmlEvents.querySelectorAll('p')).map((description) => {
      return description.textContent ?? 'NO DESCRIPTION';
    });
    for (let i = 0; i < eventsTitles.length; i++) {
      upcomingEvents.push({
        date: eventsDates[i],
        description: eventsDescriptions[i],
        imageUrl: eventsImagesUrls[i],
        title: eventsTitles[i],
        type: eventsTypes[i],
        url: eventsUrls[i],
      });
    }
    return upcomingEvents;
  }

  private transformHtmlOrganizersToArrayOfContacts(htmlOrganizers: Element): GDSCTeamMember[] {
    return Array.from(htmlOrganizers.querySelectorAll('.people-card')).map((contact) => {
      // TODO(GH-3): make sure avatar name and title is required in core team member
      const memberPhoto = contact.querySelector('img') as HTMLImageElement;
      return {
        avatar: memberPhoto.src,
        name: memberPhoto.alt,
        title: contact.querySelector('.people-card--title')?.textContent ?? 'NO TITLE',
      };
    });
  }
}
