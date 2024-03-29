import { KKProjectProposition, ProjectPropositionProps } from './ProjectProposition.type';
import { Chip } from '../../../components/Chip/Chip';
import { DifficultyChip } from '../../../components/DifficultyChip/DifficultyChip';
import { IconID } from '../../../components/Icon/Icon.enum';
import { KKLabeledUrlIcon } from '../../../components/LabeledUrlIcon/LabeledUrlIcon.type';
import { KKWebComponent } from '../../../components/KKWebComponent/KKWebComponent';
import { LabeledUrlIcon } from '../../../components/LabeledUrlIcon/LabeledUrlIcon';
import style from './ProjectProposition.css';

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

export class ProjectProposition extends KKWebComponent implements KKProjectProposition {
  static TAG = `kk-project-proposition`;

  private readonly projectTitle: HTMLHeadingElement = this._shadowRoot.querySelector('.project__name') as HTMLHeadingElement;
  private readonly projectTechnologies: HTMLUListElement = this._shadowRoot.querySelector('.technologies-wrapper') as HTMLUListElement;
  private readonly projectDescription: HTMLParagraphElement = this._shadowRoot.querySelector('.project__description') as HTMLParagraphElement;
  private readonly projectRepo: KKLabeledUrlIcon = this._shadowRoot.querySelector('.project__repository') as KKLabeledUrlIcon;
  private readonly projectPicture: HTMLImageElement = this._shadowRoot.querySelector('.project__picture') as HTMLImageElement;
  private readonly projectPictureCaption: HTMLElement = this._shadowRoot.querySelector('.project__picture__description') as HTMLElement;

  constructor(project: ProjectPropositionProps) {
    super(template, style);
    if (project) {
      this.setSingleProjectData(project);
    }
  }

  public setSingleProjectData({ name, difficulty, description, readmeUrl, technologies, pictureUrl }: ProjectPropositionProps): void {
    this.projectTitle.id = name;
    this.projectTitle.textContent = name;
    this.projectTechnologies.append(new DifficultyChip(difficulty));
    this.addTechnologiesTags(technologies);
    this.projectDescription.textContent = description;
    void this.projectRepo.setData({ iconId: IconID.GITHUB, label: name, url: readmeUrl });
    this.projectPicture.src = pictureUrl;
    this.projectPicture.alt = name;
    this.projectPictureCaption.textContent = `${name} app screenshot`;
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

customElements.define(ProjectProposition.TAG, ProjectProposition);
