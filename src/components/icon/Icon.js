import { style } from "./Icon.style.js";
import { loadWholeStreamAsString } from "../../utils.js";
import { KKWebComponent } from "../KKWebComponent.js";
import { SelectService } from "../../services/SelectionService.js";

const template = ``;

export class Icon extends KKWebComponent {
  static TAG = `kk-icon`;
  static HIGHLIGHTED_CLASS = 'active';

  icon =  new SelectService();
  size;

  constructor(size = 64, iconId) {
    super(template, style);
    this.size = size;
    if(iconId !== undefined) {
      void this.setIcon(iconId)
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
    const iconResponse = await fetch(`./assets/icons/${iconId}.svg`, {cache: 'force-cache'});
    const rawIcon = (await loadWholeStreamAsString(iconResponse.body));
    this.icon.changeInteractiveElement(new DOMParser().parseFromString(rawIcon, 'image/svg+xml').firstElementChild);
    this.shadowRoot.appendChild(this.icon.interactiveElement);
    this.setSize(this.size);
  }
}

customElements.define(Icon.TAG, Icon);
