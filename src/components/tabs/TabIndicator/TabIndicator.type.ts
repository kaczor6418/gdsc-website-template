import { KKWebComponentHandler } from '../../KKWebComponent/KKWebComponent.type';

export interface TabIndicatorProps {
  width: number;
}

export interface KKTabIndicator extends KKWebComponentHandler {
  move(tabIndex: number): void;
  changeWidth(width: number): void;
}
