import { InfoBox } from '../infoBox/InfoBox';
import { isEmptyArray } from '../../common/utils/isEmptyArray';
import { KKProjects } from './Projects.type';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent';
import { ProjectProposition } from './ProjectProposition/ProjectProposition';
import { ProjectPropositionProps } from './ProjectProposition/ProjectProposition.type';
import { SingleProject } from './SingleProject/SingleProject';
import { SingleProjectProps } from './SingleProject/SingleProject.type';
import style from './Projects.css';

const template = `
<section class="projects-propositions">
  <h2>Projects propositions</h2>
</section>
<hr class="divider"/>
<section class="projects-created">
  <h2>Created projects</h2>
</section>
`;

export class Projects extends KKWebComponent implements KKProjects {
  static TAG = `kk-projects`;

  private readonly projectsWrapper: HTMLElement = this._shadowRoot.querySelector('.projects-created') as HTMLElement;
  private readonly projectsPropositions: HTMLElement = this._shadowRoot.querySelector('.projects-propositions') as HTMLElement;

  constructor() {
    super(template, style);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this.fetchCreatedProjects().then(this.renderCreatedProjects);
    void this.fetchProjectsPropositions().then(this.renderProjectsPropositions);
  }

  private async fetchCreatedProjects(): Promise<SingleProjectProps[]> {
    const response = await fetch('./assets/configs/projects.json');
    return (await response.json()) as SingleProjectProps[];
  }

  private async fetchProjectsPropositions(): Promise<ProjectPropositionProps[]> {
    const response = await fetch('./assets/configs/projects-propositions.json');
    return (await response.json()) as ProjectPropositionProps[];
  }

  private renderCreatedProjects = (projects: SingleProjectProps[]): void => {
    if (isEmptyArray(projects)) {
      this.projectsWrapper.append(new InfoBox('There are no created projects!'));
    } else {
      const projectsList = document.createElement('ul');
      const allProjects = document.createDocumentFragment();
      for (const project of projects) {
        const projectElement = document.createElement('li');
        projectElement.className = 'project';
        projectElement.append(new SingleProject(project));
        allProjects.append(projectElement);
      }
      projectsList.append(allProjects);
      this.projectsWrapper.append(projectsList);
    }
  };

  private renderProjectsPropositions = (projects: ProjectPropositionProps[]): void => {
    if (isEmptyArray(projects)) {
      this.projectsPropositions.append(new InfoBox('There are no projects propositions!'));
    } else {
      const projectsList = document.createElement('ul');
      const allProjects = document.createDocumentFragment();
      for (const project of projects) {
        const projectElement = document.createElement('li');
        projectElement.className = 'project';
        projectElement.append(new ProjectProposition(project));
        allProjects.append(projectElement);
      }
      projectsList.append(allProjects);
      this.projectsPropositions.append(projectsList);
    }
  };
}

customElements.define(Projects.TAG, Projects);
