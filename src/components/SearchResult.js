import { BaseComponent } from './BaseComponent.js';
import { PhotoBox } from './PhotoBox.js';

export default class SearchResult extends BaseComponent {
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    super(`
      <section class="gallery">
        <div class="state-box hidden"></div>
        <div class="photo-box"></div>
      </section>
    `);
    $target.appendChild(this.element);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData.data;
    this.loading = nextData.loading;
    this.render();
  }

  loadingAction(loadingOrFail, success) {
    if (this.loading) {
      loadingOrFail.classList.remove('hidden');
      success.classList.add('hidden');
      loadingOrFail.innerHTML = `<img src='/src/images/loading.gif' />`;
    }

    if (this.data) {
      // 로딩 후, 데이터가 없을 때 (data = [])
      if (!this.loading && this.data.length == 0) {
        loadingOrFail.innerHTML = `<img src='/src/images/emptybox.png' />`;
      }

      // 로딩 후, 데이터가 있을 때
      if (!this.loading && !!this.data.length) {
        success.classList.remove('hidden');
        loadingOrFail.classList.add('hidden');

        this.data.map((cat) => {
          const catBox = new PhotoBox(cat);
          catBox.attachTo(success);
        });

        this.element.querySelectorAll('.photo').forEach(($item, index) => {
          $item.addEventListener('click', () => {
            this.onClick(this.data[index]);
          });
        });
      }
    }
  }

  render() {
    const stateBox = this.element.querySelector('.state-box');
    const photoBox = this.element.querySelector('.photo-box');

    this.loadingAction(stateBox, photoBox);
  }
}
