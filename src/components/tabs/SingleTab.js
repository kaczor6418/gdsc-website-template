import { style } from './SingleTab.style.js';
import { KKWebComponent } from '../KKWebComponent.js';
import { rippleEffect } from '../../rippleEffect.js';
import { SelectService } from '../../services/SelectionService.js';

const template = `
<button role="tab" class="tab" tabindex="0" aria-selected="false">
  <span class="content" data-content=""></span>
</button>
`;

export class SingleTab extends KKWebComponent {
  static TAG = `kk-single-tab`;
  static ACTIVE_CLASS = 'tab--active';

  tab = this.shadowRoot.querySelector('button');
  changeTabCallback;
  _index;
  _name;

  constructor({ changeTabCallback, name }, index) {
    super(template, style);
    this._name = name;
    this._index = index;
    this.changeTabCallback = changeTabCallback;
    this.selectionService = new SelectService(this.tab);
    this.setTabContent();
  }

  get name() {
    return this._name;
  }

  get index() {
    return this._index;
  }

  connectedCallback() {
    this.tab.addEventListener('click', (e) => {
      rippleEffect(this.tab, e);
      this.changeTabCallback();
    });
  }

  activate() {
    this.tab.classList.add(SingleTab.ACTIVE_CLASS);
  }

  deactivate() {
    this.tab.classList.remove(SingleTab.ACTIVE_CLASS);
  }

  isActive() {
    return this.tab.classList.contains(SingleTab.ACTIVE_CLASS);
  }

  isInactive() {
    return !this.tab.classList.contains(SingleTab.ACTIVE_CLASS);
  }

  setTabContent() {
    const tabContent = this.tab.querySelector('span');
    tabContent.textContent = this._name;
    tabContent.setAttribute('data-content', this._name);
  }
}

customElements.define(SingleTab.TAG, SingleTab);
