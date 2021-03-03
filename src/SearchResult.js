class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    const template = document.createElement('template');
    template.innerHTML = `
        <section class="gallery">
          <div class="state-box"></div>
          <div class="photo-box"></div>
        </section>
      `;
    this.element = template.content.firstElementChild;

    this.data = initialData;
    this.onClick = onClick;

    $target.appendChild(this.element);
  }

  setState(nextData) {
    this.data = nextData.data;
    this.loading = nextData.loading;
    this.render();
  }

  render() {
    const state = this.element.querySelector('.state-box');
    const photos = this.element.querySelector('.photo-box');

    // 로딩 중
    if (this.loading) {
      state.classList.remove('hidden');
      photos.classList.add('hidden');
      state.innerHTML = `<img src='./src/img/loading.gif' />`;
    }

    if (this.data) {
      // 로딩 후, 데이터가 없을 때 (data = [])
      if (!this.loading && !this.data.length) {
        state.innerHTML = `<img src='./src/img/emptybox.png' />`;
      }

      // 로딩 후, 데이터가 있을 때
      if (!this.loading && !!this.data.length) {
        state.classList.add('hidden');
        photos.classList.remove('hidden');

        photos.innerHTML = this.data
          .map(
            (cat) => `
                <div class="photo">
                  <img src=${cat.url} alt=${cat.name} />
                  <h3 class="cat-name"><span>${cat.name}</span></h3>
                </div>
            `
          )
          .join('');

        this.element.querySelectorAll('.photo').forEach((photo, index) => {
          photo.addEventListener('click', () => {
            this.onClick(this.data[index]);
          });

          photo.addEventListener('mouseover', () => {
            photo.lastElementChild.classList.add('active');
          });

          photo.addEventListener('mouseout', () => {
            photo.lastElementChild.classList.remove('active');
          });
        });
      }
    }
  }
}
