import { CanNotUseSelectionServiceError } from '../../errors/CanNotUseSelectionServiceError';
import { isDefined } from '../../common/utils/isDefined';
import type { ISelectionService } from './SelectionService.type';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';

export class SelectService<T extends HTMLElement> implements ISelectionService<T> {
  private static DISABLED_CLASS = 'disabled';

  public interactiveElement!: T;

  constructor(interactiveElement?: T, disabled = false) {
    if (isDefined(interactiveElement)) {
      this.interactiveElement = interactiveElement;
      this.addNeededAttributes();
      this.setListeners();
    }
    if (disabled) {
      this.disable();
    }
  }

  public changeInteractiveElement(newElement: T): void {
    this.interactiveElement = newElement;
    this.addNeededAttributes();
    this.setListeners();
  }

  public disable(): void {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
    this.interactiveElement.classList.add(SelectService.DISABLED_CLASS);
    this.interactiveElement.tabIndex = -1;
  }

  public enable(): void {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
    this.interactiveElement.tabIndex = 0;
    this.interactiveElement.classList.remove(SelectService.DISABLED_CLASS);
  }

  public select(): void {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
    if (this.isEnabled()) {
      this.interactiveElement.setAttribute('data-selected', 'true');
    }
  }

  public unselect(): void {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
    this.interactiveElement.setAttribute('data-selected', 'false');
  }

  public isDisabled(): boolean {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
    return this.interactiveElement.classList.contains(SelectService.DISABLED_CLASS);
  }

  public isEnabled(): boolean {
    return !this.isDisabled();
  }

  private addNeededAttributes(): void {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
    this.interactiveElement.setAttribute('data-selected', 'false');
    this.interactiveElement.tabIndex = 0;
  }

  private setListeners(): void {
    if (isNullOrUndefined(this.interactiveElement)) {
      throw new CanNotUseSelectionServiceError();
    }
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
