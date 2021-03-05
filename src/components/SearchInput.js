import { BaseComponent } from './BaseComponent.js';

export default class SearchInput extends BaseComponent {
  constructor(onSearch) {
    super(
      `<input 
        type="text" 
        class="search-input" 
        placeholder="고양이를 검색해보세요" 
      />`
    );

    this.onSearch = onSearch;
    this.element.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.onSearch(e.target.value);
      }
    });
  }
}
