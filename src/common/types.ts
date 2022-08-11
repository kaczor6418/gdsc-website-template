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
