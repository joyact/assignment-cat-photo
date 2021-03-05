import { BaseComponent } from './BaseComponent.js';
import { PhotoBox } from './PhotoBox.js';

export default class SearchResult extends BaseComponent {
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    super(`<div class="SearchResult"></div>`);
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
    this.data.map((cat) => {
      const catBox = new PhotoBox(cat);
      catBox.attachTo(this.element);
    });

    this.element.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
