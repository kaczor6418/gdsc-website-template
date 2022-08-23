import { ClubMember } from '../../../common/types';
import { KKWebComponentHandler } from '../../KKWebComponent/KKWebComponent.type';

export interface KKSingleProject extends KKWebComponentHandler {
  setSingleProjectData(props: SingleProjectProps): void;
}

export interface SingleProjectProps {
  name: string;
  description: string;
  sourceCode: string;
  technologies: string[];
  demo: ProjectDemo;
  creators: ClubMember[];
}

export interface ProjectDemo {
  url: string;
  picture: string;
}
