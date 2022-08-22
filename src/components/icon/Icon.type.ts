import type { IconSize } from './Icon.enum';
import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKIcon extends KKWebComponentHandler<IconObservedAttributesTypes> {
  highlight(): void;
  unhighlight(): void;
  setSize(size: number): void;
  setIcon(iconId: string): Promise<void>;
}

export interface IconObservedAttributesTypes {
  KK_ICON_ID: string;
  KK_ICON_SIZE: IconSize;
}
