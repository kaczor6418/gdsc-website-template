import { KKWebComponentHandler } from '../KKWebComponent/KKWebComponent.type';

export interface KKTabs extends KKWebComponentHandler {
  addTab(tabProps: TabProps): void;
  addTabs(tabs: TabProps[]): void;
  activateTab(tabName: string): void;
}

export interface TabsProps {
  tabs: TabProps[];
  activeTab: string;
}

export interface TabProps {
  name: string;
  changeTabCallback: () => void;
  disabled: boolean;
}
