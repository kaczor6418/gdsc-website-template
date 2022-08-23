import { ClubMember } from '../../../common/types';
import type { KKWebComponentHandler } from '../../KKWebComponent/KKWebComponent.type';

export interface KKSingleTeam extends KKWebComponentHandler {
  initializeDate(props: SingleTeamProps): void;
}

export interface SingleTeamProps {
  name: string;
  description: string;
  lookingFor: string;
  contact: TeamMemberContact;
  members: ClubMember[];
  technologies: string[];
}

export interface TeamMemberContact {
  discord?: string;
  messanger?: string;
  telegram?: string;
  mail?: string;
  phone?: string;
}
