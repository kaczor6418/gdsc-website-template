export interface ISelectionService<T extends HTMLElement> {
  interactiveElement: T;

  changeInteractiveElement(newElement: T): void;
  disable(): void;
  enable(): void;
  select(): void;
  unselect(): void;
  isDisabled(): boolean;
  isEnabled(): boolean;
}
