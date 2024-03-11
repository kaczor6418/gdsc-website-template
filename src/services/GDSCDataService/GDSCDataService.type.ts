import type { ContactMedia } from '../../common/types';

export interface IGDSCDataService {
  getContact(): Promise<ContactMedia[]>;

  getClubName(): Promise<string>;

  getPastEvents(): Promise<GetEvents>;

  getUpcomingEvents(): Promise<GetEvents>;

  getOrganizers(): Promise<GDSCTeamMember[]>;

  getDescription(): Promise<string>;
}

export interface GetEvents {
  events: GDSCEvent[];
  haveMoreEvents: boolean;
}

/**
 * @param count total events count
 * @param pagination pagination settings
 * @param results  list of all events for requested page
 */
export interface GetEventsResponse {
  count: number;
  pagination: {
    current_page: number;
    next_page: number | null;
    previous_page: number | null;
  };
  results: RawEvent[];
}

/**
 * @param cropped_banner_url url to event full width banner
 * @param cropped_picture_url url to event miniature picture
 * @param description event full description in HTML format
 * @param start_date event date in ISO string
 * @param event_type_title event type workshop/hackathon...
 * @param title event title
 * @param url url to event page
 * @param cohost_registration_url url to event page if there is an external organizer of the event
 * @param description_short short description of the event in plain text
 */
export interface RawEvent {
  cropped_banner_url: string;
  cropped_picture_url: string;
  description: string;
  start_date: string;
  event_type_title: string;
  title: string;
  url: string;

  cohost_registration_url?: string;
  description_short?: string;
}

export type GetRawEventsParameters = Array<keyof RawEvent>;

export const enum EventType {
  LIVE = ' Live',
  COMPLETED = 'Completed',
}

export interface GDSCEvent {
  title: string;
  url: string;
  date: string;
  imageUrl: string;
  type: string | undefined;
  description: string;
}

export interface GDSCTeamMember {
  name: string;
  avatar: string;
  title?: string;
}
