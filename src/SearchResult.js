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
    // 로딩 중
    if (this.loading) {
      this.$searchResult.innerHTML = `<p>검색 중</p>`;
    }

    // 로딩 후, 데이터가 없을 때 (data = [])
    if (!this.loading && !this.data.length) {
      this.$searchResult.innerHTML = `<p>검색결과가 없습니다</p>`;
    }

    // 로딩 후, 데이터가 있을 때
    if (!this.loading && !!this.data.length) {
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
