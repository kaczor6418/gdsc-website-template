import { KKWebComponentHandler } from '../../KKWebComponent/KKWebComponent.type';

export interface KKSingleTab extends KKWebComponentHandler {
  readonly name: string;
  readonly index: number;

  activate(): void;
  deactivate(): void;
  isActive(): boolean;
  isInactive(): boolean;
  setTabContent(): void;
}
