import { ContactMedia } from '../../common/types';
import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKSocialMedia extends KKWebComponentHandler {
  setSocialMediaIcons(icons: ContactMedia[]): void;
}
