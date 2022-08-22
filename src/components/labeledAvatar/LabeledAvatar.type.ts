import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';
import type { Size } from '../../common/types';

export interface KKLabeledAvatar extends KKWebComponentHandler {
  label: string;
  subLabel: string;
  avatar: string;
  size: Size;
}
