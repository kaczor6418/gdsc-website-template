# GDSC website template

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

> Here you can find a YouTube vide with full explanation how to set up your own GDSC Website **[How to set up GDSC website template]()**

### Create a fork

1. Go under this url: https://github.com/GDSC-Lodz-University-of-Technology/gdsc-tul-website
2. Click fork button in the right upper corner
3. Choose organization in which you want to create your own GDSC Website

### Host your GDSC website

1. Open your fork of [gdsc-website-template]() which you have created in previous step
2. Open **Settings** (It is a cog button which should appear as the last tab under
   name-of-your-organization/gdsc-website-template)
3. Find and click **Pages** tab in left vertical navbar (should be the penultimate tab)
4. As the source choose **Branch > master** and directory **/root**
5. click **Save** button
6. At the top of this panel you should see green notification with address of your webpage
7. If website doesn't appear try to push ay changes to the **master** branch, or you can skip it for now because in the
   next section we will take care of configuration

## Configuration

> Here you can find a YouTube vide with full explanation how to configure your own GDSC Website **[How to configure GDSC website template]()**