import type { DifficultyLevel } from '../../difficultyChip/DifficultyChip.enum';
import { KKWebComponentHandler } from '../../KKWebComponent/KKWebComponent.type';

export interface KKProjectProposition extends KKWebComponentHandler {
  setSingleProjectData(props: ProjectPropositionProps): void;
}

export interface ProjectPropositionProps {
  name: string;
  difficulty: DifficultyLevel;
  technologies: string[];
  description: string;
  readmeUrl: string;
  pictureUrl: string;
}
