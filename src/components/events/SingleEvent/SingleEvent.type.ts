import { KKWebComponentHandler } from '../../KKWebComponent/KKWebComponent.type';
import { SingleEventObservedAttributes } from './SingleEvent.enum';

export type KKSingleEvent = KKWebComponentHandler;

export interface SingleEventObservedAttributesTypes {
  [SingleEventObservedAttributes.KK_PICTURE]: string;
  [SingleEventObservedAttributes.KK_TITLE]: string;
  [SingleEventObservedAttributes.KK_URL]: string;
  [SingleEventObservedAttributes.KK_DATE]: string;
  [SingleEventObservedAttributes.KK_DESCRIPTION]: string;
}
