import { Icon } from '../icon/Icon.js';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent.ts';
import { style } from './UrlIcon.style.js';

const template = `
<a href="#" class="icon-wrapper">
  url-icon
  <${Icon.TAG}></${Icon.TAG}>
</a>
`;

export class UrlIcon extends KKWebComponent {
  static TAG = `kk-url-icon`;
  static observedAttributes = ['kk-url', 'kk-icon-id', 'kk-icon-size'];

  iconWrapper = this.shadowRoot.querySelector('.icon-wrapper');
  icon = this.shadowRoot.querySelector(Icon.TAG);

  constructor(url, iconProps) {
    super(template, style, iconProps);
    this.iconWrapper.href = url;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return void 0;
    }
    switch (name) {
      case 'kk-icon-id':
        void this.icon.setIcon(newValue);
        break;
      case 'kk-icon-size':
        this.icon.setSize(parseInt(newValue));
        break;
      case 'kk-url':
        this.iconWrapper.href = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${UrlIcon.name} component`);
    }
  }
}

customElements.define(UrlIcon.TAG, UrlIcon);
