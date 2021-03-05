import { BaseComponent } from './BaseComponent.js';
import RandomButton from './RandomButton.js';
import SearchInput from './SearchInput.js';

export default class Header extends BaseComponent {
  constructor({ $target, onSearch, onRandom }) {
    super(`
      <header>
        <h1>JIBSA</h1>
        <button class="theme-button">테마변경</button>
        <div class="search-box"></div>
        <ul class="search-history"></ul>
      </header>
    `);

    const searchContainer = this.element.querySelector('.search-box');

    // 검색창 input
    const input = new SearchInput(onSearch);
    input.attachTo(searchContainer);

    const button = new RandomButton(onRandom);
    button.attachTo(searchContainer);

    $target.appendChild(this.element);
  }
}
