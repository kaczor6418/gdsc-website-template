export class KKWebComponent extends HTMLElement {
  props;

  constructor(template, styles, props) {
    super();
    this.props = props;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.injectStyles(styles);
  }

  connectedCallback() {
    if (this.props != null) {
      for (const [key, value] of Object.entries(this.props)) {
        this.setAttribute(key, value);
      }
    }
  }

  injectStyles(styles) {
    const styleWrapper = document.createElement('style');
    styleWrapper.innerHTML = styles;
    this.shadowRoot.appendChild(styleWrapper);
  }
}
