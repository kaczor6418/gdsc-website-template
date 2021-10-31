import { style } from './SingleProject.style.js';
import { KKWebComponent } from "../KKWebComponent.js";

const template = ``;

export class SingleProject extends KKWebComponent {
  static TAG = `kk-single-project`;

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

customElements.define(SingleProject.TAG, SingleProject);
