import { BaseComponent } from './BaseComponent.js';

export default class SearchInput extends BaseComponent {
  constructor({ $target, onSearch }) {
    super(
      `<input 
        type="text" 
        class="SearchInput" 
        placeholder="고양이를 검색해보세요" 
      />`
    );

    $target.appendChild(this.element);

    this.element.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    console.log('SearchInput created.', this);
  }
  render() {}
}
