import type { ContactMedia } from '../../common/types';

export interface IGDSCDataService {
  getContact(): Promise<ContactMedia[]>;
  getClubName(): Promise<string>;
  getPastEvents(): Promise<GDSCPastEvent[]>;
  getUpcomingEvents(): Promise<GDSCUpcomingEvent[]>;
  getOrganizers(): Promise<GDSCTeamMember[]>;
  getDescription(): Promise<string>;
  fetchSinglePastEventDescription(eventUrl: string): Promise<string>;
}

export interface GDSCBaseEvents {
  title: string;
  url: string;
  date: string;
  imageUrl: string;
  type: string | undefined;
}

export type GDSCPastEvent = GDSCBaseEvents;

export interface GDSCUpcomingEvent extends GDSCBaseEvents {
  description: string;
}

export interface GDSCTeamMember {
  name: string;
  avatar: string;
  title: string;
}
