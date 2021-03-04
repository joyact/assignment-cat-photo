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

    // get the latest searched data when refresh
    const latest = JSON.parse(localStorage.getItem('data'));
    if (latest) {
      this.data = latest;
    }
    this.render();
  }

  setState(nextData) {
    this.data = nextData.data;
    this.loading = nextData.loading;
    this.render();
  }

  loadPage(loadingOrFail, success) {
    // 로딩 중
    if (this.loading) {
      loadingOrFail.classList.remove('hidden');
      success.classList.add('hidden');
      loadingOrFail.innerHTML = `<img src='./src/img/loading.gif' />`;
    }

    if (this.data) {
      // 로딩 후, 데이터가 없을 때 (data = [])
      if (!this.loading && !this.data.length) {
        loadingOrFail.innerHTML = `<img src='./src/img/emptybox.png' />`;
      }

      // 로딩 후, 데이터가 있을 때
      if (!this.loading && !!this.data.length) {
        loadingOrFail.classList.add('hidden');
        success.classList.remove('hidden');
        success.innerHTML = this.data
          .map(
            (cat) => `
                <div class="photo">
                  <img src=${cat.url} alt=${cat.name} />
                  <h3 class="cat-name"><span>${cat.name}</span></h3>
                </div>
            `
          )
          .join('');
      }
    }
  }

  displayDataOnEvent(element) {
    element.querySelectorAll('.photo').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });

      item.addEventListener('mouseover', () => {
        item.lastElementChild.classList.add('active');
      });

      item.addEventListener('mouseout', () => {
        item.lastElementChild.classList.remove('active');
      });
    });
  }

  render() {
    const state = this.element.querySelector('.state-box');
    const photos = this.element.querySelector('.photo-box');

    this.loadPage(state, photos);
    this.displayDataOnEvent(photos);
  }
}
