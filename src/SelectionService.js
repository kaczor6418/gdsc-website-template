export class SelectService {
  static DISABLED_CLASS = 'disabled';
  interactiveElement;

  constructor(interactiveElement, disabled = false) {
    this.interactiveElement = interactiveElement;
    this.addNeededAttributes();
    this.setListeners();
    if (disabled) {
      this.disable();
    }
  }

  disable() {
    this.interactiveElement.classList.add(SelectService.DISABLED_CLASS);
    this.interactiveElement.tabIndex = -1;
  }

  enable() {
    this.interactiveElement.tabIndex = 0;
    this.interactiveElement.classList.remove(SelectService.DISABLED_CLASS);
  }

  isDisabled() {
    return this.interactiveElement.classList.contains(SelectService.DISABLED_CLASS);
  }

  isEnabled() {
    return !this.isDisabled();
  }

  select() {
    if (this.isEnabled()) {
      this.interactiveElement.setAttribute('aria-selected', 'true');
    }
  }

  unselect() {
    this.interactiveElement.setAttribute('aria-selected', 'false');
  }

  addNeededAttributes() {
    this.interactiveElement.setAttribute('aria-selected', 'false');
    this.interactiveElement.tabIndex = 0;
  }

  setListeners() {
    this.interactiveElement.addEventListener('focus', () => this.select());
    this.interactiveElement.addEventListener('blur', () => this.unselect());
    this.interactiveElement.addEventListener('mouseenter', () => this.select());
    this.interactiveElement.addEventListener('mouseleave', () => this.unselect());
  }
}