import { style } from './Projects.style.js';
import { KKWebComponent } from "../KKWebComponent.js";
import { InfoBox } from '../infoBox/InfoBox.js';
import { SingleProject } from './SingleProject.js';

const template = `
<section class="projects-wrapper">
</section>
`;

export class Projects extends KKWebComponent {
  static TAG = `kk-projects`;

  projectsWrapper = this.shadowRoot.querySelector('.projects-wrapper');

  constructor() {
    super(template, style);
    void this.fetchProjects().then((projects) => this.renderProjects(projects));
  }

  async fetchProjects() {
    const response = await fetch('./assets/configs/projects.json');
    this.projects = await response.json();
  }

  renderProjects(projects) {
    if(projects.length === 0) {
      this.projectsWrapper.append(new InfoBox('There are no projects!'));
    } else {
      const projectsList = document.createElement('ul');
      const allProjects = document.createDocumentFragment();
      for(const project of projects) {
        const projectElement = document.createElement('li');
        projectElement.append(new SingleProject(project));
        allProjects.append(projectElement);
      }
      projectsList.append(allProjects);
      this.projectsWrapper.append(projectsList);
    }
  }
}

customElements.define(Projects.TAG, Projects);
