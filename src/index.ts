declare global {
  interface Window {
    AAOrganizationsList: typeof AAOrganizationsList;
  }
}

export class AAOrganizationsList {
  constructor(selector: string) {
    const elements: NodeListOf<Element> = Array.prototype.slice.call(
      window.document.querySelectorAll(selector)
    );

    for (let el in elements) {
      this.process(elements[el]);
    }
  }

  async getData() {
    // const tags = (el.getAttribute('data-tags') || '').split(',');
    const res = await fetch(
      `https://api.aquaponicsassociation.org/organizations`
    );

    const json = await res.json();
    return json;
  }

  async process(el: Element) {
    const data = await this.getData();
    console.log(data);
  }
}

window.AAOrganizationsList = AAOrganizationsList;
