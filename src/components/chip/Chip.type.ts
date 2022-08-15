import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface IChip extends KKWebComponentHandler<ChipObservedAttributesTypes> {
  content: string;
}

export interface ChipObservedAttributesTypes {
  KK_TEXT: string;
}
