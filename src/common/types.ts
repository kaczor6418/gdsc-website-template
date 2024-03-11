import type { SocialMediaType } from './enums';

export interface TemplateConfig {
  gdscClubRootUrl: string;
  clubName: string;
  contact: ContactMedia[];

  clubId?: string;
}

export interface ContactMedia {
  iconId: SocialMediaType;
  url: string;
}

export interface Size {
  height: number;
  width: number;
}

export interface ClubMember {
  avatar: string;
  name: string;
  url?: string;
}

export interface EventSpeaker extends ClubMember {
  title?: string;
}

export interface KKFetchResponse<T = Record<PropertyKey, unknown>> extends Response {
  json(): Promise<T>;
}
