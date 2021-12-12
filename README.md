# GDSC website template

1. [Description](#description)
2. [Philosophy](#philosophy)
3. [Requirements](#requirements)
4. [Getting started](#getting-started)
   1. [Create a fork](#create-a-fork)
   2. [Host your GDSC website](#host-your-gdsc-website)
5. [Configuration](#configuration)
   1. [General configuration](#general-configuration)
   2. [Teams configuration](#teams-configuration)
   3. [Projects configuration](#projects-configuration)
   4. [Projects propositions configuration](#projects-propositions-configuration)
6. [Updating configs](#updating-configs)
   1. [Adding new team](#adding-new-team)
   2. [Adding new project](#adding-new-project)
   3. [Adding new project proposition](#adding-new-project-proposition)

## Description

This repository contains a generic template for Google Developer Students Club website. By filling config files all
events and club organizers will be automatically fetched from your GDSC page and reflected in this page. Additionally,
by filling proper configs you can also share the information about students teems that looking for help, projects
created by students and projects propositions that students can make.

Under the hood whole project is built in plain JavaScript with CSS and HTML. To split the code I have use WebComponents.
In the future there is a plan to add TypeScript

## Philosophy

When I become a GDSC Lead I was looking for options to encourage students to make their own projects and create a teams
and work together. Unfortunately GDSC page doesn't provide such features, and what's more It was also to hard the
information about sites connected to your club (I wanted to make it more visible and straight-forward) so I have decided
to build my own website and make it generic to allow other leads to use it.

After few months of work between studies and work I came up with this v1.0 version which for sure will be improved in
the future. If you are interested in what I am planing to do next check
this [v2.0 road-map](https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website/projects/1)

## Requirements

To create your own GDSC Website using this repository you will need:

- GitHub account
- Basic understanding of GitHub platform
- GitHub organization (optional)

And that's all you do not need any server or your own private domain. We will use services provided by GitHub platform
to make everything work and do not pay anything.

## Getting started

> Here you can find a YouTube vide with full explanation how to set up your own GDSC Website **[How to set up GDSC website template](https://www.youtube.com/watch?v=QhbFGR7OAT4)**

### Create a fork

1. Go under this url: https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website
2. Click fork button in the right upper corner
3. Choose organization in which you want to create your own GDSC Website

### Host your GDSC website

1. Open your fork of [gdsc-website-template](https://github.com/kaczor6418/gdsc-website-template) which you have created in previous step
2. Open **Settings** (It is a cog button which should appear as the last tab under
   name-of-your-organization/gdsc-website-template)
3. Find and click **Pages** tab in left vertical navbar (should be the penultimate tab)
4. As the source choose **Branch > master** and directory **/root**
5. click **Save** button
6. At the top of this panel you should see green notification with address of your webpage
7. If website doesn't appear try to push ay changes to the **master** branch, or you can skip it for now because in the
   next section we will take care of configuration

## Configuration

> Here you can find a YouTube vide with full explanation how to configure your own GDSC Website **[How to set general configuration for GDSC website template](https://www.youtube.com/watch?v=YveI5pVWox0)**

### General configuration

1. Open _**`./assets/configs/config.json`**_ file
2. Change **`gdscClubRootUrl`** to your GDSC club page url. This is required for reflecting events and organizers
   information
3. Change **`clubName`** to your GDSC club name (keep it short)
4. Add contact information. For example link to official GDSC page, GitHub of your club, discord group ...

Structure of _**`config.json`**_ can be described by such interface:

```typescript
/**
 * @gdscClubRootUrl → url to root page of your official GDSC club
 * @clubName → name of your club
 * @contact → how people can contact with your team
 */
interface Config {
  gdscClubRootUrl: string;
  clubName: string;
  contact: SingleContact[];
}

/**
 * @iconId → id of one of allowed icons
 * @url → utl to club github/twitter/discord ...
 */
interface SingleContact {
  iconId: ContactIcon;
  url: string;
}

type ContactIcon = 'facebook' | 'twitter' | 'github' | 'discord' | 'gdsc' | 'instagram';
```

### Teams configuration

> Here you can find a YouTube vide with full explanation how to set configuration for teams **[How to set teams configuration for GDSC website template](https://www.youtube.com/watch?v=QQ1KrjX5vLg)**

1. Open _**`./assets/configs/teams.json`**_ file
2. If someone from your club members is looking for teammates to start or continue a project here is the best place to
   add advertisement and let other club members to know about this. Each of club members can also create a request with
   teem advertisement, but I will talk about this later
3. If you leave this config empty then information that there is no any team yet will appear in **Teams** tab

Structure of _**`teams.json`**_ can be described by such interface:

```typescript
type TeamsConfig = TeamConfig[];

/**
 * @name → name of the team should be unique across all teams
 * @description → short description what team is doing
 * @lookingFor → short description of people that can join team
 * @technologies → array of technoliges which you are using in the team
 * @contact → how to contact with team (at leas one)
 * @members → current mebers of the team (at least one)
 */
interface TeamConfig {
  name: string;
  description: string;
  lookingFor: string;
  technologies: string[];
  contact: Partial<TeamContact>;
  members: TeamMember[];
}

/**
 * name of the comunicator and url/number to team comunicator
 */
interface TeamContact {
  discord: string;
  messanger: string;
  telegram: string;
  mail: string;
  phone: number
}

/**
 * @name → name or alias of the team meber
 * @avatarUrl → url to avator of team meber
 * @url → url to teammeber Blog/GitHub/Twwiteer/LinkedIn
 */
interface TeamMember {
  name: string;
  avatarUrl: string;
  url: string;
}
```

### Projects configuration

> Here you can find a YouTube vide with full explanation how to set configuration for projects **[How to set projects configuration for GDSC website template](https://www.youtube.com/watch?v=YUqxkicjZSo)**

1. Open _**`./assets/configs/projects.json`**_ file
2. If someone from your club members or group of members want to show their project to other people here is a place to
   do that. Showing work of your team can be a good idea to inspire other members to create their own projects too. Each
   of club members can also create a request with description of created project, but I will talk about this later
3. If you leave this config empty then information that there is no any created projects yet will appear in **Projects**
   tab in **Created projects** section

Structure of _**`projects.json`**_ can be described by such interface:

```typescript
type ProjectsConfig = ProjectConfig[];

/**
 * @name → name of the team should be unique across all projects
 * @description → short description what team is doing
 * @sourceCode → url to sorce code of the project
 * @technologies → list of technologies which been used to create project
 * @demo → more info about created projects
 * @creators → list of people that have created this project
 */
interface ProjectConfig {
  name: string;
  description: string;
  sourceCode: string;
  technologies: string[];
  demo: ProjectDemo;
  creators: Creator[];
}

/**
 * @url → url to project demo/source code/video if demo is not deployed
 * @picture → url to picture of running project
 */
interface ProjectDemo {
  url: string;
  picture: string;
}

/**
 * @name → name or alias of the project creator
 * @avatarUrl → url to avator of the project creator
 * @url → url to creator Blog/GitHub/Twwiteer/LinkedIn
 */
interface Creator {
  name: string;
  avatarUrl: string;
  url: string;
}
```

### Projects propositions configuration

> Here you can find a YouTube vide with full explanation how to set configuration for projects propositions **[How to set projects propositions configuration for GDSC website template](https://www.youtube.com/watch?v=b_HxDt1luZM)**

1. Open _**`./assets/configs/projects-propositions.json`**_ file
2. If you want to encourage your club members to work on projects and develop their skills by writing a code, here you
   can add projects propositions on which they can work
3. If you leave this config empty then information that there is no any created projects yet will appear in **Projects**
   tab in **Projects propositions** section

```typescript
type ProjectsPropositionConfig = ProjectProposition[];

/**
 * @name → name of the proposed project should be unique across all proposed projects
 * @description → short description what you can learn by doing this project and what is the main target of this project
 * @technologies → list of technologies which you may use making this project
 * @difficulty → what is the difficulty of this project
 * @readmeUrl → url to readme of this project with more descriptive description of this project
 * @pictureUrl → picture of possible project
 */
interface ProjectConfig {
  name: string;
  description: string;
  technologies: string[];
  difficulty: DificultyLevel;
  readmeUrl: string;
  pictureUrl: string;
}

type DificultyLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'MASTER';
```

## Updating configs

### Adding new team

> Here you can find a YouTube vide with full explanation how to add new team **[How to add new team to GDSC website](https://www.youtube.com/watch?v=DbLMpqINEGM)**

1. Open repository of your gdsc-website-for which you have created
2. Find  _**`./assets/configs/teams.json`**_ file in GitHub repository
3. Click **_Edit_** button
4. Edit view of _**`teams.json`**_ should open
5. On the beginning of this file add an object as the new first element of array with information of new team
6. In _**Commit changes**_ section add title for example `team(team-name): add new team`
7. Add short description why you want to add this advertisement
8. Add `new-team` label
9. Select _**Create a new branch for this commit and start a pull request.**_
10. Add GDSC Lead or any core team member as reviewer
11. Click _**Propose changes**_ to submit you Pull Request
12. Someone with Write privileges needs to approve your Pull Request and merge this with master (core-team member or
    GDSC Lead)
13. After Pull Request will be approved and merged you should see new team in **Teams** tab at your website

### Adding new project

> Here you can find a YouTube vide with full explanation how to add new project **[How to add new project to GDSC website](https://www.youtube.com/watch?v=5DaM-NeoNLs)**

1. Open repository of your gdsc-website-for which you have created
2. Find  _**`./assets/configs/projects.json`**_ file in GitHub repository
3. Click **_Edit_** button
4. Edit view of _**`projects.json`**_ should open
5. On the beginning of this file add an object as the new first element of array with information of project
6. In _**Commit changes**_ section add title for example `project(project-name): add new project`
7. Add short description why you want to show your work
8. Select _**Create a new branch for this commit and start a pull request.**_
9. Add `new-project` label
10. Add GDSC Lead or any core team member as reviewer
11. Click _**Propose changes**_ to submit you Pull Request
12. Someone with Write privileges needs to approve your Pull Request and merge this with master (core-team member or
    GDSC Lead)
13. After Pull Request will be approved and merged you should see new project in **Projects** tab in **Created
    projects** section at your website

### Adding new project proposition

> Here you can find a YouTube vide with full explanation how to add new project-proposition **[How to add new project-proposition to GDSC website](https://www.youtube.com/watch?v=z0SU-S8dm4w)**


1. Open repository of your gdsc-website-for which you have created
2. Find  _**`./assets/configs/projects-propositions.json`**_ file in GitHub repository
3. Click **_Edit_** button
4. Edit view of _**`projects-propositions.json`**_ should open
5. On the beginning of this file add an object as the new first element of array with information of project proposition
6. In _**Commit changes**_ section add title for example `project-proposition(project-proposition-name): add new project-proposition`
7. Add short description why you want to show your work
8. Select _**Create a new branch for this commit and start a pull request.**_
9. Add `new-project-proposition` label
10. Add GDSC Lead or any core team member as reviewer
11. Click _**Propose changes**_ to submit you Pull Request
12. Someone with Write privileges needs to approve your Pull Request and merge this with master (core-team member or
    GDSC Lead)
13. After Pull Request will be approved and merged you should see new project in **Projects** tab in **Created
    projects** section at your website
