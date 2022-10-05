import type { IconID, IconSize } from './Icon.enum';
import type { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKIcon extends KKWebComponentHandler<IconObservedAttributesTypes> {
  highlight(): void;
  unhighlight(): void;
  setSize(size: number): void;
  setIcon(iconId: string): Promise<void>;
}

export interface IconObservedAttributesTypes {
  KK_ICON_ID: string | IconID;
  KK_ICON_SIZE: IconSize;
}
