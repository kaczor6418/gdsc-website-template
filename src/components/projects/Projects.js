import { InfoBox } from '../infoBox/InfoBox.js';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent.ts';
import { ProjectProposition } from './ProjectProposition.js';
import { SingleProject } from './SingleProject.js';
import { style } from './Projects.style.js';

const template = `
<section class="projects-propositions">
  <h2>Projects propositions</h2>
</section>
<hr class="divider"/>
<section class="projects-created">
  <h2>Created projects</h2>
</section>
`;

export class Projects extends KKWebComponent {
  static TAG = `kk-projects`;

  projectsWrapper = this.shadowRoot.querySelector('.projects-created');
  projectsPropositions = this.shadowRoot.querySelector('.projects-propositions');

  constructor() {
    super(template, style);
  }

  connectedCallback() {
    super.connectedCallback();
    void this.fetchCreatedProjects().then(this.renderCreatedProjects);
    void this.fetchProjectsPropositions().then(this.renderProjectsPropositions);
  }

  async fetchCreatedProjects() {
    const response = await fetch('./assets/configs/projects.json');
    return await response.json();
  }

  async fetchProjectsPropositions() {
    const response = await fetch('./assets/configs/projects-propositions.json');
    return await response.json();
  }

  renderCreatedProjects = (projects) => {
    if (projects.length === 0) {
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

  renderProjectsPropositions = (projects) => {
    if (projects.length === 0) {
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
