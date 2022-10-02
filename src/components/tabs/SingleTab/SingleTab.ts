import { isDefined } from '../../../common/utils/isDefined';
import { KKSingleTab } from './SingleTab.type';
import { KKWebComponent } from '../../KKWebComponent/KKWebComponent';
import { rippleEffect } from '../../../rippleEffect';
import { style } from './SingleTab.style';
import { TabProps } from '../Tabs.type';

const template = `
<button role="tab" class="tab" tabindex="0" aria-selected="false">
  <span class="content" data-content=""></span>
</button>
`;

export class SingleTab extends KKWebComponent implements KKSingleTab {
  static TAG = `kk-single-tab`;
  private static ACTIVE_CLASS = 'tab--active';

  private readonly tab: HTMLButtonElement = this._shadowRoot.querySelector('button') as HTMLButtonElement;
  private readonly changeTabCallback: () => void;
  private readonly _index: number;
  private readonly _name;

  constructor({ changeTabCallback, name }: TabProps, index: number) {
    super(template, style);
    this._name = name;
    this._index = index;
    this.changeTabCallback = changeTabCallback;
    this.setTabContent();
  }

  get name(): string {
    return this._name;
  }

  get index(): number {
    return this._index;
  }

  public connectedCallback(): void {
    this.tab.addEventListener('click', (e) => {
      rippleEffect(this.tab, e);
      this.changeTabCallback();
    });
  }

  public activate(): void {
    this.tab.classList.add(SingleTab.ACTIVE_CLASS);
  }

  public deactivate(): void {
    this.tab.classList.remove(SingleTab.ACTIVE_CLASS);
  }

  public isActive(): boolean {
    return this.tab.classList.contains(SingleTab.ACTIVE_CLASS);
  }

  public isInactive(): boolean {
    return !this.tab.classList.contains(SingleTab.ACTIVE_CLASS);
  }

  public setTabContent(): void {
    const tabContent = this.tab.querySelector('span');
    if (isDefined(tabContent)) {
      tabContent.textContent = this._name;
      tabContent.setAttribute('data-content', this._name);
    }
  }
}

customElements.define(SingleTab.TAG, SingleTab);
