import { Chip } from '../chip/Chip.ts';
import { DifficultyChip } from '../difficultyChip/DifficultyChip.ts';
import { KKWebComponent } from '../KKWebComponent/KKWebComponent.ts';
import { LabeledUrlIcon } from '../labeledUrlIcon/LabeledUrlIcon.ts';
import { style } from './ProjectProposition.style.js';

const template = `
<details>
  <summary>
    <div class="summary-wrapper">
      <h3 class="project__name"></h3>
      <ul class="technologies-wrapper"></ul>
    </div>
  </summary>
  <section class="project__info">
    <p class="project__description"></p>
    <div class="project__additional-info">
      <figure class="picture-wrapper">
        <img class="project__picture" loading="lazy" src="#" alt="Some project">
        <figcaption class="project__picture__description"></figcaption>
      </figure> 
      <${LabeledUrlIcon.TAG} class="project__repository"></${LabeledUrlIcon.TAG}>
    </div>
  </section>
</details>
`;

export class ProjectProposition extends KKWebComponent {
  static TAG = `kk-project-proposition`;

  projectTitle = this.shadowRoot.querySelector('.project__name');
  projectTechnologies = this.shadowRoot.querySelector('.technologies-wrapper');
  projectDescription = this.shadowRoot.querySelector('.project__description');
  projectRepo = this.shadowRoot.querySelector('.project__repository');
  projectPicture = this.shadowRoot.querySelector('.project__picture');
  projectPictureCaption = this.shadowRoot.querySelector('.project__picture__description');

  constructor(project) {
    super(template, style);
    if (project) {
      this.setSingleProjectData(project);
    }
  }

  setSingleProjectData({ name, difficulty, description, readmeUrl, technologies, pictureUrl }) {
    this.projectTitle.id = name;
    this.projectTitle.textContent = name;
    this.projectTechnologies.append(new DifficultyChip(difficulty));
    this.addTechnologiesTags(technologies);
    this.projectDescription.textContent = description;
    this.projectRepo.setData(name, 'github', readmeUrl);
    this.projectPicture.src = pictureUrl;
    this.projectPicture.alt = name;
    this.projectPictureCaption.textContent = `${name} app screenshot`;
  }

  addTechnologiesTags(technologies) {
    const technologiesWrapper = document.createDocumentFragment();
    for (const technology of technologies) {
      const singleTechnology = document.createElement('li');
      singleTechnology.className = 'technology';
      singleTechnology.append(new Chip(technology));
      technologiesWrapper.append(singleTechnology);
    }
    this.projectTechnologies.append(technologiesWrapper);
  }
}

customElements.define(ProjectProposition.TAG, ProjectProposition);
