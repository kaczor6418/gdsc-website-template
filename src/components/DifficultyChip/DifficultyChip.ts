import { Chip } from '../Chip/Chip';
import { DifficultyLevel } from './DifficultyChip.enum';
import type { KKDifficultyChip } from './DifficultyChip.type';
import { NoObservableAttribute } from '../../errors/NoObservableAttribute';

export class DifficultyChip extends Chip implements KKDifficultyChip {
  static TAG = 'kk-difficulty-chip';

  private static LEVEL_BASIC = 'hsla(100,100%,50%,0.2)';
  private static LEVEL_INTERMEDIATE = 'hsla(48,100%,50%,0.2)';
  private static LEVEL_ADVANCED = 'hsla(25,100%,50%,0.2)';
  private static LEVEL_MASTER = 'hsla(0,100%,50%,0.2)';

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (newValue) {
      case DifficultyLevel.BASIC:
        this.tagWrapper.style.backgroundColor = DifficultyChip.LEVEL_BASIC;
        break;
      case DifficultyLevel.INTERMEDIATE:
        this.tagWrapper.style.backgroundColor = DifficultyChip.LEVEL_INTERMEDIATE;
        break;
      case DifficultyLevel.ADVANCED:
        this.tagWrapper.style.backgroundColor = DifficultyChip.LEVEL_ADVANCED;
        break;
      case DifficultyLevel.MASTER:
        this.tagWrapper.style.backgroundColor = DifficultyChip.LEVEL_MASTER;
        break;
      default:
        throw new NoObservableAttribute(DifficultyChip.TAG, DifficultyChip.observedAttributes, name);
    }
  }
}

customElements.define(DifficultyChip.TAG, DifficultyChip);
