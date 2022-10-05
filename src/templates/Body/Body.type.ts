import { KKWebComponentHandler } from '../../components/KKWebComponent/KKWebComponent.type';

export interface KKBody extends KKWebComponentHandler {
  changeTab(tabName: string): Promise<void>;
}
