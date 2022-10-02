import { KKLabeledUrlIcon, KKLabeledUrlIconProps } from './LabeledUrlIcon.type';
import { Icon } from '../icon/Icon';
import { isDefined } from '../../common/utils/isDefined';
import { KKIcon } from '../icon/Icon.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { style } from './LabeledUrlIcon.style';

const template = `
<a class="wrapper" href="#">
  <${Icon.TAG} class="icon"></${Icon.TAG}>
  <label class="label"></label>
</a>
`;

export class LabeledUrlIcon extends KKWebComponent implements KKLabeledUrlIcon {
  static TAG = `kk-labeled-url-icon`;

  private readonly wrapper: HTMLAnchorElement = this._shadowRoot.querySelector('.wrapper') as HTMLAnchorElement;
  private readonly _icon: KKIcon = this.wrapper.querySelector('.icon') as unknown as KKIcon;
  private readonly _label: HTMLLabelElement = this.wrapper.querySelector('.label') as HTMLLabelElement;

  constructor(props: KKLabeledUrlIconProps) {
    super(template, style);
    if (isDefined(props)) {
      void this.setData(props);
    }
  }

  get label(): string {
    return this._label.textContent ?? '';
  }

  set label(text: string) {
    this._label.textContent = text;
  }

  public async setIcon(iconId: string): Promise<void> {
    await this._icon.setIcon(iconId);
  }

  public async setData({ label, iconId, url }: KKLabeledUrlIconProps): Promise<void> {
    this.label = label;
    this.wrapper.href = url;
    await this.setIcon(iconId);
  }
}

customElements.define(LabeledUrlIcon.TAG, LabeledUrlIcon);
