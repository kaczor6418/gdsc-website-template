import { style } from './SingleProject.style.js';
import { Chip } from '../chip/Chip.js';
import { KKWebComponent } from '../KKWebComponent.js';
import { LabeledUrlIcon } from '../labeledUrlIcon/LabeledUrlIcon.js';
import { LabeledUrlAvatar } from '../labeledUrlAvatar/LabeledUrlAvatar.js';

const template = `
<details>
  <summary>
    <div class="summary-wrapper">
      <h2 class="project__name"></h2>
      <ul class="technologies-wrapper"></ul>
    </div>
  </summary>
  <div class="project__content--wrapper">
    <section class="project__info">
      <div class="project__base-informations">
        <p class="project__description"></p>
        <h3>Creators: </h3>
        <ul class="project__creators"></ul>
      </div>
    </section>
    <section class="project__demo">
    <a class="project__application" href="#">
      <figure>
        <img class="project__picture" loading="lazy" src="#" alt="Some project">
        <figcaption class="project__picture__description"></figcaption>
      </figure> 
    </a>
    <${LabeledUrlIcon.TAG} class="project__repository"></${LabeledUrlIcon.TAG}>
    </section>
  </div>
</details>
`;

export class SingleProject extends KKWebComponent {
  static TAG = `kk-single-project`;

  projectTitle = this.shadowRoot.querySelector('.project__name');
  projectTechnologies = this.shadowRoot.querySelector('.technologies-wrapper');
  projectDescription = this.shadowRoot.querySelector('.project__description');
  projectRepo = this.shadowRoot.querySelector('.project__repository');
  projectCreators = this.shadowRoot.querySelector('.project__creators');
  projectDemo = this.shadowRoot.querySelector('.project__application');
  projectDemoPicture = this.projectDemo.querySelector('.project__picture');
  projectDemoCaption = this.projectDemo.querySelector('.project__picture__description');

  constructor(project) {
    super(template, style);
    if (project) {
      this.setSingleProjectData(project);
    }
  }

  setSingleProjectData({name, description, sourceCode, technologies, demo, creators}) {
    this.projectTitle.id = name;
    this.projectTitle.textContent = name;
    this.addTechnologiesTags(technologies);
    this.projectDescription.textContent = description;
    this.projectRepo.setData(name, 'github', sourceCode);
    this.addCreators(creators);
    this.projectDemo.href = demo.url;
    this.projectDemoPicture.src = demo.picture;
    this.projectDemoPicture.alt = name;
    this.projectDemoCaption.textContent = `${name} app screenshot`;
  }

  addCreators(creators) {
    const creatorsWrapper = document.createDocumentFragment();
    for (const {name, avatar, url} of creators) {
      const singleCreator = document.createElement('li');
      singleCreator.className = 'creator';
      singleCreator.append(new LabeledUrlAvatar(name, avatar, url));
      creatorsWrapper.append(singleCreator);
    }
    this.projectCreators.append(creatorsWrapper);
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

customElements.define(SingleProject.TAG, SingleProject);
