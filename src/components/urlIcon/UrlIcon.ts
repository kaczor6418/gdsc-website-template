import { Icon } from '../icon/Icon';
import { KKIcon } from '../icon/Icon.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { KKWebComponentObservedAttributes } from '../KKWebComponent/KKWebComponent.type';
import { style } from './UrlIcon.style';
import { UrlIconObservedAttributes } from './UrlIcon.enum';
import { UrlIconObservedAttributesTypes } from './UrlIcon.type';

const template = `
<a href="#" class="icon-wrapper">
  url-icon
  <${Icon.TAG}></${Icon.TAG}>
</a>
`;

export class UrlIcon extends KKWebComponent<UrlIconObservedAttributesTypes> {
  static TAG = `kk-url-icon`;
  static observedAttributes = [UrlIconObservedAttributes.KK_URL, UrlIconObservedAttributes.KK_ICON_ID, UrlIconObservedAttributes.KK_ICON_SIZE];

  private readonly iconWrapper: HTMLAnchorElement = this.shadowRoot.querySelector('.icon-wrapper') as HTMLAnchorElement;
  private readonly icon: KKIcon = this.shadowRoot.querySelector(Icon.TAG) as KKIcon;

  constructor(url: string, iconProps: KKWebComponentObservedAttributes<UrlIconObservedAttributesTypes>) {
    super(template, style, iconProps);
    this.iconWrapper.href = url;
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case UrlIconObservedAttributes.KK_ICON_ID:
        void this.icon.setIcon(newValue);
        break;
      case UrlIconObservedAttributes.KK_ICON_SIZE:
        this.icon.setSize(parseInt(newValue, 10));
        break;
      case UrlIconObservedAttributes.KK_URL:
        this.iconWrapper.href = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${UrlIcon.name} component`);
    }
  }
}

customElements.define(UrlIcon.TAG, UrlIcon);
