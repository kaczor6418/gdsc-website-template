import { IconObservedAttributes, IconSize } from './Icon.enum';
import type { IconObservedAttributesTypes, KKIcon } from './Icon.type';
import { CouldNotFetchConfigError } from '../../errors/CanNotFindIconError';
import { isDefined } from '../../common/utils/isDefined';
import type { ISelectionService } from '../../services/SelectionService/SelectionService.type';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { NoObservableAttribute } from '../../errors/NoObservableAttribute';
import { SelectService } from '../../services/SelectionService/SelectionService';
import { style } from './Icon.style';

const template = ``;

export class Icon extends KKWebComponent<IconObservedAttributesTypes> implements KKIcon {
  static TAG = `kk-icon`;
  static HIGHLIGHTED_CLASS = 'active';
  static observedAttributes = [IconObservedAttributes.KK_ICON_ID, IconObservedAttributes.KK_ICON_SIZE];

  private icon: ISelectionService<HTMLElement> = new SelectService<HTMLElement>();
  private size: IconSize;

  constructor(iconId: string, size = IconSize.M) {
    super(template, style);
    this.size = size;
    if (isDefined(iconId)) {
      void this.setIcon(iconId);
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case IconObservedAttributes.KK_ICON_ID:
        void this.setIcon(newValue);
        break;
      case IconObservedAttributes.KK_ICON_SIZE:
        this.setSize(parseInt(newValue, 10));
        break;
      default:
        throw new NoObservableAttribute(Icon.TAG, Icon.observedAttributes, name);
    }
  }

  public highlight(): void {
    this.icon.interactiveElement?.classList.add(Icon.HIGHLIGHTED_CLASS);
  }

  public unhighlight(): void {
    this.icon.interactiveElement?.classList.remove(Icon.HIGHLIGHTED_CLASS);
  }

  public setSize(size: number): void {
    this.size = size;
    this.icon.interactiveElement?.setAttribute('width', size.toString());
    this.icon.interactiveElement?.setAttribute('height', size.toString());
  }

  async setIcon(iconId: string): Promise<void> {
    if (this.hasChildNodes() && isDefined(this.icon)) {
      this.shadowRoot.removeChild(this.icon.interactiveElement);
    }
    const rawIcon = await fetch(`./assets/icons/${iconId}.svg`, { cache: 'force-cache' }).then((response) => {
      return response.text();
    });
    const newIcon = new DOMParser().parseFromString(rawIcon, 'image/svg+xml').firstElementChild;
    if (isNullOrUndefined(newIcon)) {
      throw new CouldNotFetchConfigError(iconId);
    }
    this.icon.changeInteractiveElement(newIcon as HTMLElement);
    this.shadowRoot.appendChild(this.icon.interactiveElement);
    this.setSize(this.size);
  }
}

customElements.define(Icon.TAG, Icon);
