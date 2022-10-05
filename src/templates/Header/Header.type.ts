import { KKWebComponentHandler } from '../../components/KKWebComponent/KKWebComponent.type';
import { TabsProps } from '../../components/Tabs/Tabs.type';

export interface KKHeader extends KKWebComponentHandler {
  initializeData({ logo, tabsProps, title }: HeaderProps): Promise<void>;
}

export interface HeaderProps {
  logo: string;
  tabsProps: TabsProps;
  title: string;
}
