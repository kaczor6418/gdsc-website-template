import { loadWholeStream } from "../../utils.js";
import { KKWebComponent } from "../KKWebComponent.js";

const template = ``;

export class Icon extends KKWebComponent {
  static TAG = `kk-icon`;
  static HIGHLIGHTED_CLASS = 'active';

  icon;
  size;

  constructor() {
    super(template, import('./Icon.style.js'));
    this.size = 64;
  }

  highlight() {
    this.icon?.classList.add(Icon.HIGHLIGHTED_CLASS);
  }

  unhighlight() {
    this.icon?.classList.remove(Icon.HIGHLIGHTED_CLASS);
  }

  setSize(size) {
    this.size = size;
    this.icon?.setAttribute('width', size);
    this.icon?.setAttribute('height', size);
  }

  async setIcon(iconId) {
    if (this.hasChildNodes() && this.icon != null) {
      this.shadowRoot.removeChild(this.icon);
    }
    const iconResponse = await fetch(`./assets/icons/${iconId}.svg`, {cache: "force-cache"});
    const rawIcon = (await loadWholeStream(iconResponse.body)).join('');
    this.icon = new DOMParser().parseFromString(rawIcon, 'image/svg+xml').firstElementChild;
    this.shadowRoot.appendChild(this.icon);
    this.setSize(this.size);
  }
}

customElements.define(Icon.TAG, Icon);
