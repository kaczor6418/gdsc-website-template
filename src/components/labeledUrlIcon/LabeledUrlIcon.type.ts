export interface KKLabeledUrlIcon {
  label: string;
  setIcon(iconId: string): Promise<void>;
}

export interface KKLabeledUrlIconProps {
  label: string;
  iconId: string;
  url: string;
}
