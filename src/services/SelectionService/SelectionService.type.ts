export interface ISelectionService {
  changeInteractiveElement(newElement: HTMLElement): void;
  disable(): void;
  enable(): void;
  select(): void;
  unselect(): void;
  isDisabled(): boolean;
  isEnabled(): boolean;
}
