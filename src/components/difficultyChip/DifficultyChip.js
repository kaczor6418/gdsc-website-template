import { Chip } from '../chip/Chip.ts';

export class DifficultyChip extends Chip {
  static TAG = 'kk-difficulty-chip';

  constructor(difficultyLevel) {
    super(difficultyLevel);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (newValue) {
      case 'BASIC':
        this.tagWrapper.style.backgroundColor = 'hsla(100,100%,50%,0.2)';
        break;
      case 'INTERMEDIATE':
        this.tagWrapper.style.backgroundColor = 'hsla(48,100%,50%,0.2)';
        break;
      case 'ADVANCED':
        this.tagWrapper.style.backgroundColor = 'hsla(25,100%,50%,0.2)';
        break;
      case 'MASTER':
        this.tagWrapper.style.backgroundColor = 'hsla(0,100%,50%,0.2)';
        break;
      default:
        throw new Error(`Level ${newValue} of difficulty doesnt exists`);
    }
  }
}

customElements.define(DifficultyChip.TAG, DifficultyChip);
