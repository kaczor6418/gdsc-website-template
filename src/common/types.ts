import type { SocialMediaType } from './enums';

export interface TemplateConfig {
  gdscClubRootUrl: string;
  clubName: string;
  contact: ContactMedia[];
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
  title: string;
}
