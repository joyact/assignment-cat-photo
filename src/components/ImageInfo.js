import { BaseComponent } from './BaseComponent.js';
import { ModalContent } from './ModalContent.js';

export default class ImageInfo extends BaseComponent {
  data = null;

  constructor({ $target, data, onClose }) {
    super(`
      <div class="modal"></div>
    `);

    $target.appendChild(this.element);
    this.data = data;
    this.onClose = onClose;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const modal = document.querySelector('.modal');

    if (this.data.visible) {
      const modalbox = new ModalContent(this.data.image);

      modalbox.overWriteIn(modal);
      modal.addEventListener('click', (e) => {
        if (
          e.target.className === 'close' ||
          (e.target == modal && e.target !== modalbox)
        ) {
          modal.classList.remove('active');
          this.onClose();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          modal.classList.remove('active');
          this.onClose();
        }
      });
      modal.classList.add('active');
    } else {
      modal.classList.remove('active');
    }
  }
}
