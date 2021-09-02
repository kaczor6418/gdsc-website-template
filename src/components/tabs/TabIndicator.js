import { KKWebComponent } from '../KKWebComponent.js';


const template = `
  <span class="indicator"></span>
`;

export class TabIndicator extends KKWebComponent {
  static TAG = `kk-tab-indicator`;

  indicator = this.shadowRoot.querySelector('span');

  width;
  index;

  constructor({ width }) {
    super(template, import('./TabIndicator.style.js'));
    this.index = 0;
    this.width = width;
    this.indicator.style.width = `${width}%`;
  }

  changeWidth(width) {
    this.width = width;
    this.indicator.style.width = `${width}%`;
    this.move(this.index);
  }

  move(tabIndex) {
    const delta = Math.abs(tabIndex - this.index);
    this.index = tabIndex;
    this.indicator.style.transitionDuration = `calc(250 * ${delta})`;
    this.indicator.style.left = `${tabIndex * this.width}%`;
  }
}

customElements.define(TabIndicator.TAG, TabIndicator);
