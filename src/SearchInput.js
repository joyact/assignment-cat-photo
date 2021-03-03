const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.';

    // autofocus
    this.$searchInput.autofocus = true;

    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

    $searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    // clear the search bar
    $searchInput.addEventListener('click', (e) => {
      e.target.value = '';
    });

    console.log('SearchInput created.', this);
  }
  render() {}
}
