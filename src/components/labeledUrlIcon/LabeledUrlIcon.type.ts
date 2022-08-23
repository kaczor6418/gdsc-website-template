import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKLabeledUrlIcon extends KKWebComponentHandler {
  setIcon(iconId: string): Promise<void>;
  setData(props: KKLabeledUrlIconProps): Promise<void>;
}

export interface KKLabeledUrlIconProps {
  label: string;
  iconId: string;
  url: string;
}
