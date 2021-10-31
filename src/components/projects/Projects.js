import { style } from './Projects.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = ``;

export class Projects extends KKWebComponent {
  static TAG = `kk-projects`;

  projects = []

  constructor() {
    super(template, style);
    void this.fetchProjects().then(() => console.log(this.projects));
  }

  async fetchProjects() {
    const response = await fetch('./assets/configs/projects.json');
    this.projects = await response.json();
  }
}

customElements.define(Projects.TAG, Projects);
