import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKEvents extends KKWebComponentHandler {
  setUpcomingEvents(): Promise<void>;
  setPastEvents(): Promise<void>;
}
