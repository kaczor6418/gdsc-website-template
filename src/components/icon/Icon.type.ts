import type { IconSize } from './Icon.enum';

export interface IIcon {
  highlight(): void;
  unhighlight(): void;
  setSize(size: number): void;
  setIcon(iconId: string): Promise<void>;
}

export interface ChipObservedAttributesTypes {
  KK_ICON_ID: string;
  KK_ICON_SIZE: IconSize;
}
