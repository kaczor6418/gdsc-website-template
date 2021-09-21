export class KKWebComponent extends HTMLElement {

  constructor(template, styles) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.injectStyles(styles);
  }

  injectStyles(styles) {
    const styleWrapper = document.createElement('style');
    styleWrapper.innerHTML = styles;
    this.shadowRoot.appendChild(styleWrapper);
  }
}
