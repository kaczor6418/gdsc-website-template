import { isDefined } from '../../common/utils/isDefined';
import type { ISelectionService } from './SelectionService.type';

export class SelectService implements ISelectionService {
  private static DISABLED_CLASS = 'disabled';

  private interactiveElement: HTMLElement;

  constructor(interactiveElement: HTMLElement, disabled = false) {
    this.interactiveElement = interactiveElement;
    if (isDefined(this.interactiveElement)) {
      this.addNeededAttributes();
      this.setListeners();
    }
    if (disabled) {
      this.disable();
    }
  }

  public changeInteractiveElement(newElement: HTMLElement): void {
    this.interactiveElement = newElement;
    this.addNeededAttributes();
    this.setListeners();
  }

  public disable(): void {
    this.interactiveElement.classList.add(SelectService.DISABLED_CLASS);
    this.interactiveElement.tabIndex = -1;
  }

  public enable(): void {
    this.interactiveElement.tabIndex = 0;
    this.interactiveElement.classList.remove(SelectService.DISABLED_CLASS);
  }

  public select(): void {
    if (this.isEnabled()) {
      this.interactiveElement.setAttribute('aria-selected', 'true');
    }
  }

  public unselect(): void {
    this.interactiveElement.setAttribute('aria-selected', 'false');
  }

  public isDisabled(): boolean {
    return this.interactiveElement.classList.contains(SelectService.DISABLED_CLASS);
  }

  public isEnabled(): boolean {
    return !this.isDisabled();
  }

  private addNeededAttributes(): void {
    this.interactiveElement.setAttribute('aria-selected', 'false');
    this.interactiveElement.tabIndex = 0;
  }

  private setListeners(): void {
    this.interactiveElement.addEventListener('focus', () => {
      return this.select();
    });
    this.interactiveElement.addEventListener('blur', () => {
      return this.unselect();
    });
    this.interactiveElement.addEventListener('mouseenter', () => {
      return this.select();
    });
    this.interactiveElement.addEventListener('mouseleave', () => {
      return this.unselect();
    });
  }
}
