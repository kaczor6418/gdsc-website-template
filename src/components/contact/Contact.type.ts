import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';
import { TeamMemberContact } from '../teams/SingleTeam/SingleTeam.type';

export interface KKContact extends KKWebComponentHandler {
  setContacts(contact: TeamMemberContact): void;
}
