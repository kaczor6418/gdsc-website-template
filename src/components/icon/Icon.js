import { SelectService } from "../../services/SelectionService.js";
import { KKWebComponent } from "../KKWebComponent.js";
import { style } from "./Icon.style.js";

const template = ``;

export class Icon extends KKWebComponent {
  static TAG = `kk-icon`;
  static HIGHLIGHTED_CLASS = 'active';
  static observedAttributes = ['kk-icon-id', 'kk-icon-size'];

  icon = new SelectService();
  size;

  constructor(iconId, size = 64) {
    super(template, style);
    this.size = size;
    if (iconId !== undefined) {
      void this.setIcon(iconId)
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return void 0;
    }
    switch (name) {
      case 'kk-icon-id':
        void this.setIcon(newValue);
        break;
      case 'kk-icon-size':
        this.setSize(parseInt(newValue));
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${UrlIcon.name} component`);
    }
  }

  highlight() {
    this.icon.interactiveElement?.classList.add(Icon.HIGHLIGHTED_CLASS);
  }

  unhighlight() {
    this.icon.interactiveElement?.classList.remove(Icon.HIGHLIGHTED_CLASS);
  }

  setSize(size) {
    this.size = size;
    this.icon.interactiveElement?.setAttribute('width', size);
    this.icon.interactiveElement?.setAttribute('height', size);
  }

  async setIcon(iconId) {
    if (this.hasChildNodes() && this.icon != null) {
      this.shadowRoot.removeChild(this.icon.interactiveElement);
    }
    const rawIcon = await fetch(`./assets/icons/${iconId}.svg`, {cache: 'force-cache'}).then(response => response.text());
    this.icon.changeInteractiveElement(new DOMParser().parseFromString(rawIcon, 'image/svg+xml').firstElementChild);
    this.shadowRoot.appendChild(this.icon.interactiveElement);
    this.setSize(this.size);
  }
}

customElements.define(Icon.TAG, Icon);
