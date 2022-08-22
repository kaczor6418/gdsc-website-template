import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKLabeledUrlIcon extends KKWebComponentHandler {
  label: string;
  setIcon(iconId: string): Promise<void>;
}

export interface KKLabeledUrlIconProps {
  label: string;
  iconId: string;
  url: string;
}
