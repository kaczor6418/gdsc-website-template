import { style } from './SingleEvent.style.js';
import { KKWebComponent } from '../KKWebComponent.js';
import { rippleEffect } from '../../rippleEffect.js';
import { SelectService } from '../../services/SelectionService/SelectionService.ts';

const template = `
<a href="#">
  <div class="wrapper">
    <img class="picture" loading="lazy" src="#" alt="Event picture miniature">
    <div class="content">
      <div class="header">
        <h3 class="title"></h3>
        <span class="date"></span>
      </div>
      <p class="description"></p>
    </div>
  </div>
</a>
`;

export class SingleEvent extends KKWebComponent {
  static TAG = 'kk-upcoming-event';
  static observedAttributes = ['kk-url', 'kk-picture', 'kk-title', 'kk-date', 'kk-description'];

  wrapper;
  container = this.shadowRoot.querySelector('a');
  picture = this.shadowRoot.querySelector('.picture');
  titleHeader = this.shadowRoot.querySelector('.title');
  date = this.shadowRoot.querySelector('.date');
  description = this.shadowRoot.querySelector('.description');

  constructor(props) {
    super(template, style, props);
    this.wrapper = new SelectService(this.shadowRoot.querySelector('.wrapper'));
    this.initializeListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return void 0;
    }
    switch (name) {
      case 'kk-url':
        this.container.href = newValue;
        break;
      case 'kk-picture':
        this.picture.src = newValue;
        break;
      case 'kk-title':
        this.titleHeader.textContent = newValue;
        break;
      case 'kk-date':
        this.date.textContent = newValue;
        break;
      case 'kk-description':
        this.description.textContent = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist in ${SingleEvent.name} component`);
    }
  }

  initializeListeners() {
    this.wrapper.interactiveElement.addEventListener('click', (e) => {
      return rippleEffect(this.wrapper.interactiveElement, e);
    });
  }
}

customElements.define(SingleEvent.TAG, SingleEvent);
