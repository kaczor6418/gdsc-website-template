import type { KKSingleProject, SingleProjectProps } from './SingleProject.type';
import { Chip } from '../../../components/Chip/Chip';
import { ClubMember } from '../../../common/types';
import { KKLabeledUrlIcon } from '../../../components/LabeledUrlIcon/LabeledUrlIcon.type';
import { KKWebComponent } from '../../../components/KKWebComponent/KKWebComponent';
import { LabeledUrlAvatar } from '../../../components/LabeledUrlAvatar/LabeledUrlAvatar';
import { LabeledUrlIcon } from '../../../components/LabeledUrlIcon/LabeledUrlIcon';
import style from './SingleProject.css';

const template = `
<details>
  <summary>
    <div class="summary-wrapper">
      <h3 class="project__name"></h3>
      <ul class="technologies-wrapper"></ul>
    </div>
  </summary>
  <div class="project__content--wrapper">
    <section class="project__info">
      <div class="project__base-informations">
        <p class="project__description"></p>
        <h4>Creators: </h4>
        <ul class="project__creators"></ul>
      </div>
    </section>
    <section class="project__demo">
    <a class="project__application" href="#">
      <figure class="picture-wrapper">
        <img class="project__picture" loading="lazy" src="#" alt="Some project">
        <figcaption class="project__picture__description"></figcaption>
      </figure> 
    </a>
    <${LabeledUrlIcon.TAG} class="project__repository"></${LabeledUrlIcon.TAG}>
    </section>
  </div>
</details>
`;

export class SingleProject extends KKWebComponent implements KKSingleProject {
  static TAG = `kk-single-project`;

  private readonly projectTitle: HTMLHeadingElement = this._shadowRoot.querySelector('.project__name') as HTMLHeadingElement;
  private readonly projectTechnologies: HTMLUListElement = this._shadowRoot.querySelector('.technologies-wrapper') as HTMLUListElement;
  private readonly projectDescription: HTMLParagraphElement = this._shadowRoot.querySelector('.project__description') as HTMLParagraphElement;
  private readonly projectRepo: KKLabeledUrlIcon = this._shadowRoot.querySelector('.project__repository') as KKLabeledUrlIcon;
  private readonly projectCreators: HTMLUListElement = this._shadowRoot.querySelector('.project__creators') as HTMLUListElement;
  private readonly projectDemo: HTMLAnchorElement = this._shadowRoot.querySelector('.project__application') as HTMLAnchorElement;
  private readonly projectDemoPicture: HTMLImageElement = this.projectDemo.querySelector('.project__picture') as HTMLImageElement;
  private readonly projectDemoCaption: HTMLElement = this.projectDemo.querySelector('.project__picture__description') as HTMLElement;

  constructor(project: SingleProjectProps) {
    super(template, style);
    if (project) {
      this.setSingleProjectData(project);
    }
  }

  public setSingleProjectData({ name, description, sourceCode, technologies, demo, creators }: SingleProjectProps): void {
    this.projectTitle.id = name;
    this.projectTitle.textContent = name;
    this.addTechnologiesTags(technologies);
    this.projectDescription.textContent = description;
    void this.projectRepo.setData({ iconId: 'github', label: name, url: sourceCode });
    this.addCreators(creators);
    this.projectDemo.href = demo.url;
    this.projectDemoPicture.src = demo.picture;
    this.projectDemoPicture.alt = name;
    this.projectDemoCaption.textContent = `${name} app screenshot`;
  }

  private addCreators(creators: ClubMember[]): void {
    const creatorsWrapper = document.createDocumentFragment();
    for (const { name, avatar, url } of creators) {
      const singleCreator = document.createElement('li');
      singleCreator.className = 'creator';
      singleCreator.append(new LabeledUrlAvatar(name, avatar, url ?? '#'));
      creatorsWrapper.append(singleCreator);
    }
    this.projectCreators.append(creatorsWrapper);
  }

  private addTechnologiesTags(technologies: string[]): void {
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
