import type { DifficultyLevel } from '../../../components/DifficultyChip/DifficultyChip.enum';
import { KKWebComponentHandler } from '../../../components/KKWebComponent/KKWebComponent.type';

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
