import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export type KKContact = KKWebComponentHandler;

export interface ContactProps {
  discord?: string;
  messanger?: string;
  telegram?: string;
  mail?: string;
  phone?: string;
}
