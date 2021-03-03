class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData.data;
    this.loading = nextData.loading;
    this.render();
  }

  render() {
    // loading cat pics
    if (this.loading) {
      this.$searchResult.innerHTML = `검색 중`;
    }

    // loaded cat pics
    if (!this.loading && this.data) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
            <div class="item">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
        )
        .join('');

      this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
        $item.addEventListener('click', () => {
          this.onClick(this.data[index]);
        });
      });
    }
  }
}
