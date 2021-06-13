import { html, render } from 'lit-html';
import * as qs from 'query-string';

declare global {
  interface Window {
    AAOrganizationsList: typeof AAOrganizationsList;
  }
}

export interface AAImageFormat {
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface AAImage {
  id: number;
  name: string;
  caption?: string;
  formats: {
    thumbnail: AAImageFormat;
    small: AAImageFormat;
  };
}

export interface AATag {
  id: number;
  name: string;
  description?: string;
  uid: string;
}

export interface AAOrganization {
  id: number;
  name: string;
  email?: string;
  website?: string;
  description?: string;
  logo?: AAImage;
  tags?: AATag[];
}

export default class AAOrganizationsList {
  constructor(selector: string) {
    const elements: NodeListOf<Element> = Array.prototype.slice.call(
      window.document.querySelectorAll(selector)
    );

    for (let el in elements) {
      this.process(elements[el]);
    }
  }

  async getData(params: { tags?: string }) {
    const options = {};

    if (params.tags) options['tags.id'] = params.tags;

    const res = await fetch(
      `https://api.aquaponicsassociation.org/organizations?${qs.stringify(
        options
      )}`
    );

    const json = await res.json();
    return json;
  }

  async process(el: Element) {
    const tags = el.getAttribute('data-tags');
    const data: AAOrganization[] = await this.getData({ tags });

    const template = data.map((org) => {
      if (!org?.logo?.formats?.small?.url) return;

      const logoUrl = `https://api.aquaponicsassociation.org${org?.logo?.formats?.small?.url}`;

      return html`
        <div class="aa-organization">
          <div class="aa-logo">
            <a href="${org.website || '#'}" rel="noopener" target="_blank">
              <img src="${logoUrl}" alt="${org.name}" />
            </a>
          </div>
          <a href="${org.website || '#'}" rel="noopener" target="_blank">
            <h2 class="name">${org.name}</h2>
          </a>
        </div>
      `;
    });

    render(template, el);
  }
}

window.AAOrganizationsList = AAOrganizationsList;
