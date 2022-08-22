export interface KKWebComponentHandler<T = undefined> extends HTMLElement {
  readonly kkID: bigint;

  connectedCallback(): void;
  disconnectedCallback(): void;
  adoptedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  setObservedAttributes(props: KKWebComponentObservedAttributes<T> | undefined): void;
}

export type KKWebComponentObservedAttributes<T> = {
  [K in keyof T]?: T[K];
};
