import type { KKTabIndicator, TabIndicatorProps } from './TabIndicator.type';
import { KKWebComponent } from '../../KKWebComponent/KKWebComponent';
import style from './TabIndicator.css';

const template = `
  <span class="indicator"></span>
`;

export class TabIndicator extends KKWebComponent implements KKTabIndicator {
  static TAG = `kk-tab-indicator`;

  private readonly indicator: HTMLSpanElement = this._shadowRoot.querySelector('span') as HTMLSpanElement;

  private width: number;
  private index: number;

  constructor({ width }: TabIndicatorProps) {
    super(template, style);
    this.index = 0;
    this.width = width;
    this.indicator.style.width = `${width}%`;
  }

  public changeWidth(width: number): void {
    this.width = width;
    this.indicator.style.width = `${width}%`;
    this.move(this.index);
  }

  public move(tabIndex: number): void {
    const delta = Math.abs(tabIndex - this.index);
    this.index = tabIndex;
    this.indicator.style.transitionDuration = `calc(250 * ${delta})`;
    this.indicator.style.left = `${tabIndex * this.width}%`;
  }
}

customElements.define(TabIndicator.TAG, TabIndicator);
