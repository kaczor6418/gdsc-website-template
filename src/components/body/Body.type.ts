import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKBody extends KKWebComponentHandler {
  changeTab(tabName: string): Promise<void>;
}
