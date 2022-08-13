import type { KKWebComponentHandler, KKWebComponentObservedAttributes } from './KKWebComponent.type';
import { CONSTANTS } from '../../common/CONSTANTS';
import { isDefined } from '../../common/utils/isDefined';
import { isNullOrUndefined } from '../../common/utils/isNullOrUndefined';
import { isObject } from '../../common/utils/isObject';

let componentIdCounter = BigInt(CONSTANTS.INITIAL_COMPONENT_ID);

export class KKWebComponent<T = unknown> extends HTMLElement implements KKWebComponentHandler<KKWebComponentObservedAttributes<T>> {
  public readonly shadowRoot: ShadowRoot;
  public readonly kkID: bigint;
  private readonly props: KKWebComponentObservedAttributes<T> | undefined = undefined;

  constructor(template: string, styles?: string, props?: KKWebComponentObservedAttributes<T>) {
    super();
    this.props = props;
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.kkID = componentIdCounter++;
    this.shadowRoot.innerHTML = template;
    this.injectStyles(styles);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-function,@typescript-eslint/no-empty-function
  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {}

  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
  public disconnectedCallback(): void {}

  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
  public adoptedCallback(): void {}

  public connectedCallback(): void {
    this.setObservedAttributes();
  }

  public setObservedAttributes(props?: KKWebComponentObservedAttributes<T>): void {
    const propsToSet = props ?? this.props;
    if (isDefined(propsToSet)) {
      for (const [key, value] of Object.entries(propsToSet)) {
        const attributeValue = isObject(value) || Array.isArray(value) ? JSON.stringify(value) : (value as string);
        this.setAttribute(key.toLowerCase(), attributeValue);
      }
    }
  }

  private injectStyles(styles?: string): void {
    if (isNullOrUndefined(styles)) {
      return;
    }
    const styleWrapper: HTMLStyleElement = document.createElement('style');
    styleWrapper.innerHTML = styles;
    this.shadowRoot.appendChild(styleWrapper);
  }
}
