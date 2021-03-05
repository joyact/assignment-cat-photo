import { BaseComponent } from './BaseComponent.js';
import { ModalContent } from './ModalContent.js';

export default class ImageInfo extends BaseComponent {
  data = null;

  constructor({ $target, data }) {
    super(`
      <div class="modal"></div>
    `);

    $target.appendChild(this.element);
    this.data = data;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const modal = new ModalContent(this.data.image);
      modal.attachTo(this.element);
      this.element.style.display = 'block';
    } else {
      this.element.style.display = 'none';
    }
  }
}
