export class BaseComponent {
  element = null;
  constructor(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild;
  }

  attachTo(parent) {
    parent.appendChild(this.element);
  }

  overWriteIn(parent) {
    parent.innerHTML = this.element.outerHTML;
  }
}
