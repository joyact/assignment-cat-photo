import { BaseComponent } from './BaseComponent.js';
import { PhotoBox } from './PhotoBox.js';

export default class SearchResult extends BaseComponent {
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    super(`
      <section class="gallery">
        <div class="state-box"></div>
        <div class="photo-box"></div>
      </section>
    `);
    $target.appendChild(this.element);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const photoBox = this.element.querySelector('.photo-box');
    this.data.map((cat) => {
      const catBox = new PhotoBox(cat);
      catBox.attachTo(photoBox);
    });

    this.element.querySelectorAll('.photo').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
