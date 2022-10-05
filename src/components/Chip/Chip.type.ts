import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKChip extends KKWebComponentHandler<ChipObservedAttributesTypes> {
  content: string;
}

export interface ChipObservedAttributesTypes {
  KK_TEXT: string;
}
