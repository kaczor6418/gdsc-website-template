import { KKWebComponentHandler } from '../../components/KKWebComponent/KKWebComponent.type';

export interface KKClubEvents extends KKWebComponentHandler {
  setUpcomingEvents(): Promise<void>;
  setPastEvents(): Promise<void>;
}
