import {
  ABOUT_CLUB_SELECTOR,
  CLUB_ORGANIZER_PHOTO_SELECTOR,
  CLUB_ORGANIZER_PROFILE_SELECTOR,
  CLUB_ORGANIZERS_SELECTOR,
  CONFIG_PATH,
  GDSC_COMMUNITY_BASE_URL,
} from '../../common/CONSTANTS';
import type { ContactMedia, TemplateConfig } from '../../common/types';
import { EventType, GDSCEvent, GDSCTeamMember, GetEvents, IGDSCDataService, RawEvent } from './GDSCDataService.type';
import { CanNotFindClubIdError } from '../../errors/CanNotFindClubIdError';
import { CouldNotFetchConfigError } from '../../errors/CouldNotFetchConfigError';
import { CouldNotFetchDataError } from '../../errors/CouldNotFetchDataError';
import { getRawEvents } from './getEvents';
import { isDefined } from '../../common/utils/isDefined';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';
import { removeStyleFromElement } from '../../common/utils/removeStyleFromElement';
import { UndefinedClubNameError } from '../../errors/UndefinedClubNameError';

const PAGE_INCREMENT = 1;

export class GDSCDataService implements IGDSCDataService {
  private gdscClubUrl: string | null = null;
  private clubId: string | null = null;
  private clubName: string | null = null;
  private gdscData: Document | null = null;
  private contact: ContactMedia[] | null = null;
  private upcomingEvents: Map<number, GDSCEvent[]> = new Map<number, GDSCEvent[]>();
  private pastEvents: Map<number, GDSCEvent[]> = new Map<number, GDSCEvent[]>();
  private organizers: GDSCTeamMember[] | null = null;
  private description: string | null = null;
  private nextUpcomingEventsPage: number | null = PAGE_INCREMENT;
  private nextPasEventsPage: number | null = PAGE_INCREMENT;

  private readonly configRequest: Promise<void>;

  constructor() {
    this.configRequest = this.voidInitializeConfig();
  }

  public async getContact(): Promise<ContactMedia[]> {
    await this.configRequest;
    return this.contact ?? [];
  }

  public async getClubName(): Promise<string> {
    await this.configRequest;
    if (isNullOrUndefined(this.clubName)) {
      throw new UndefinedClubNameError();
    }
    return this.clubName;
  }

  public async getPastEvents(page = this.nextPasEventsPage): Promise<GetEvents> {
    if (isNullOrUndefined(page)) {
      return { events: [], haveMoreEvents: false };
    }
    const cashedEvents = this.pastEvents.get(page);
    if (isDefined(cashedEvents)) {
      this.nextPasEventsPage = page + PAGE_INCREMENT;
      return {
        events: cashedEvents,
        haveMoreEvents: this.pastEvents.has(this.nextPasEventsPage),
      };
    }
    if (isNullOrUndefined(this.clubId)) {
      this.clubId = await this.getClubId();
    }
    const pastEventsRes = await getRawEvents(this.clubId, EventType.COMPLETED, page);
    const pastEvents = this.transformRawEventsToGDSCEvents(pastEventsRes.results);
    this.pastEvents.set(page, pastEvents);
    this.nextPasEventsPage = pastEventsRes.pagination.next_page;
    return {
      events: pastEvents,
      haveMoreEvents: this.nextPasEventsPage !== null,
    };
  }

  public async getUpcomingEvents(page = this.nextUpcomingEventsPage): Promise<GetEvents> {
    if (isNullOrUndefined(page)) {
      return { events: [], haveMoreEvents: false };
    }
    const cashedEvents = this.upcomingEvents.get(page);
    if (isDefined(cashedEvents)) {
      this.nextUpcomingEventsPage = page + PAGE_INCREMENT;
      return {
        events: cashedEvents,
        haveMoreEvents: this.upcomingEvents.has(this.nextUpcomingEventsPage),
      };
    }
    if (isNullOrUndefined(this.clubId)) {
      this.clubId = await this.getClubId();
    }
    const upcomingEventsRes = await getRawEvents(this.clubId, EventType.LIVE, page);
    const upcomingEvents = this.transformRawEventsToGDSCEvents(upcomingEventsRes.results);
    this.upcomingEvents.set(page, upcomingEvents);
    this.nextUpcomingEventsPage = upcomingEventsRes.pagination.next_page;
    return {
      events: upcomingEvents,
      haveMoreEvents: this.nextUpcomingEventsPage !== null,
    };
  }

  public async getOrganizers(): Promise<GDSCTeamMember[]> {
    if (isNullOrUndefined(this.gdscData)) {
      await this.fetchRawData();
    }
    if (isDefined(this.organizers)) {
      return this.organizers;
    }
    const rawContacts = this.gdscData?.querySelector(CLUB_ORGANIZERS_SELECTOR);
    if (isNullOrUndefined(rawContacts)) {
      return [];
    }
    this.organizers = await this.transformHtmlOrganizersToArrayOfContacts(rawContacts);
    return this.organizers;
  }

  public async getDescription(): Promise<string> {
    if (isNullOrUndefined(this.description)) {
      await this.fetchRawData();
    }
    if (isDefined(this.description)) {
      return this.description;
    }
    const descriptionElement = this.gdscData?.querySelector(ABOUT_CLUB_SELECTOR);
    if (isNullOrUndefined(descriptionElement)) {
      return `<h2>NO DESCRIPTION</h2>`;
    }
    removeStyleFromElement(descriptionElement);
    this.description = descriptionElement.innerHTML;
    return this.description;
  }

  private async voidInitializeConfig(): Promise<void> {
    try {
      const response = await fetch(CONFIG_PATH, {
        cache: 'force-cache',
      });
      const templateConfig = (await response.json()) as unknown as TemplateConfig;
      this.gdscClubUrl = templateConfig.gdscClubRootUrl;
      this.clubName = templateConfig.clubName;
      this.clubId = templateConfig.clubId ?? null;
      this.contact = templateConfig.contact;
    } catch (e) {
      throw new CouldNotFetchConfigError(e as Error);
    }
  }

  private async getClubId(): Promise<string> {
    if (this.clubId !== null) {
      return this.clubId;
    }
    const rawPage = await this.fetchRawData();
    const maybeClubId = rawPage.querySelector('form[chapterid]')?.getAttribute('chapterid');
    if (isNullOrUndefined(maybeClubId)) {
      throw new CanNotFindClubIdError();
    }
    this.clubId = maybeClubId;
    return this.clubId;
  }

  private async fetchRawData(): Promise<Document> {
    await this.configRequest;
    if (isNullOrUndefined(this.gdscClubUrl)) {
      throw new CouldNotFetchDataError('GDSC club url is undefined');
    }
    if (isNullOrUndefined(this.gdscData)) {
      const dataResponse = await fetch(this.gdscClubUrl, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      const dataRawText = await dataResponse.text();
      this.gdscData = new DOMParser().parseFromString(dataRawText, 'text/html');
    }
    return this.gdscData;
  }

  private transformRawEventsToGDSCEvents(events: RawEvent[]): GDSCEvent[] {
    const pastEvents: GDSCEvent[] = [];
    for (const event of events) {
      pastEvents.push({
        date: event.start_date,
        description: event.description_short ?? event.description,
        imageUrl: event.cropped_picture_url,
        title: event.title,
        type: event.event_type_title,
        url: event.url,
      });
    }
    return pastEvents;
  }

  private async transformHtmlOrganizersToArrayOfContacts(htmlOrganizers: Element): Promise<GDSCTeamMember[]> {
    const teamMembers: GDSCTeamMember[] = [];
    const organizersPhotos = htmlOrganizers.querySelectorAll(CLUB_ORGANIZER_PHOTO_SELECTOR);
    const organizersProfiles = Array.from<HTMLAnchorElement>(htmlOrganizers.querySelectorAll(CLUB_ORGANIZER_PROFILE_SELECTOR));
    const membersNames = await this.extractMembersData(organizersProfiles);
    for (let idx = 0; idx < organizersPhotos.length; idx++) {
      const photoEl = organizersPhotos[idx] as HTMLImageElement;
      teamMembers.push({
        avatar: photoEl.src ?? 'NO PHOTO',
        name: membersNames[idx],
      });
    }
    return teamMembers;
  }

  private async extractMembersData(membersProfilesAnchors: HTMLAnchorElement[]): Promise<string[]> {
    const profilesRes = await Promise.all(
      membersProfilesAnchors
        .map((anchor) => {
          return anchor.href.replace(location.origin, GDSC_COMMUNITY_BASE_URL);
        })
        .map((profileUrl) => {
          return fetch(profileUrl);
        })
    );
    const rawProfiles = await Promise.all(
      profilesRes.map((res) => {
        return res.text();
      })
    );
    return rawProfiles
      .map((rawProfile) => {
        return new DOMParser().parseFromString(rawProfile, 'text/html');
      })
      .map((profile) => {
        const profileTitle = profile.querySelector('head title')?.textContent;
        if (isNullOrUndefined(profileTitle)) {
          return 'NO NAME';
        }
        return profileTitle.split('|')[0].trim();
      });
  }
}
