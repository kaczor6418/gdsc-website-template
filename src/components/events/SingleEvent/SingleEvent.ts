import { KKSingleEvent, SingleEventObservedAttributesTypes } from './SingleEvent.type';
import { ISelectionService } from '../../../services/SelectionService/SelectionService.type';
import { KKWebComponent } from '../../KKWebComponent/KKWebComponent';
import { KKWebComponentObservedAttributes } from '../../KKWebComponent/KKWebComponent.type';
import { NoObservableAttribute } from '../../../errors/NoObservableAttribute';
import { rippleEffect } from '../../../rippleEffect';
import { SelectService } from '../../../services/SelectionService/SelectionService';
import { SingleEventObservedAttributes } from './SingleEvent.enum';
import style from './SingleEvent.css';

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

export class SingleEvent extends KKWebComponent<SingleEventObservedAttributesTypes> implements KKSingleEvent {
  static TAG = 'kk-upcoming-event';
  static observedAttributes = [
    SingleEventObservedAttributes.KK_URL,
    SingleEventObservedAttributes.KK_PICTURE,
    SingleEventObservedAttributes.KK_TITLE,
    SingleEventObservedAttributes.KK_DATE,
    SingleEventObservedAttributes.KK_DESCRIPTION,
  ];

  private readonly wrapper: ISelectionService<HTMLElement>;
  private readonly container: HTMLAnchorElement = this._shadowRoot.querySelector('a') as HTMLAnchorElement;
  private readonly picture: HTMLImageElement = this._shadowRoot.querySelector('.picture') as HTMLImageElement;
  private readonly titleHeader: HTMLHeadingElement = this._shadowRoot.querySelector('.title') as HTMLHeadingElement;
  private readonly date: HTMLSpanElement = this._shadowRoot.querySelector('.date') as HTMLSpanElement;
  private readonly description: HTMLParagraphElement = this._shadowRoot.querySelector('.description') as HTMLParagraphElement;

  constructor(props: KKWebComponentObservedAttributes<SingleEventObservedAttributesTypes>) {
    super(template, style, props);
    this.wrapper = new SelectService(this._shadowRoot.querySelector('.wrapper') as HTMLElement);
    this.initializeListeners();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case SingleEventObservedAttributes.KK_URL:
        this.container.href = newValue;
        break;
      case SingleEventObservedAttributes.KK_PICTURE:
        this.picture.src = newValue;
        break;
      case SingleEventObservedAttributes.KK_TITLE:
        this.titleHeader.textContent = newValue;
        break;
      case SingleEventObservedAttributes.KK_DATE:
        this.date.textContent = newValue;
        break;
      case SingleEventObservedAttributes.KK_DESCRIPTION:
        this.description.textContent = newValue;
        break;
      default:
        throw new NoObservableAttribute(SingleEvent.TAG, SingleEvent.observedAttributes, name);
    }
  }

  private initializeListeners(): void {
    this.wrapper.interactiveElement.addEventListener('click', (e) => {
      return rippleEffect(this.wrapper.interactiveElement, e);
    });
  }
}

customElements.define(SingleEvent.TAG, SingleEvent);
