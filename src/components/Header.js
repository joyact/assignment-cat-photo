import { BaseComponent } from './BaseComponent.js';
import RandomButton from './RandomButton.js';
import SearchInput from './SearchInput.js';

export default class Header extends BaseComponent {
  constructor({ $target, onSearch, onRandom }) {
    super(`
      <header>
        <h1>JIBSA</h1>
        <div class="theme-button">
          <input type="checkbox" id="theme" />
          <span></span>
        </div>
        <div class="search-box"></div>
        <ul class="search-history"></ul>
      </header>
    `);

    const searchContainer = this.element.querySelector('.search-box');

    // 검색창 input
    const input = new SearchInput(onSearch);
    input.attachTo(searchContainer);

    const randomButton = new RandomButton(onRandom);
    randomButton.attachTo(searchContainer);

    $target.appendChild(this.element);
    this.render();
  }

  setTheme(themeName) {
    const body = document.querySelector('body');
    localStorage.setItem('theme', themeName);
    body.className = themeName;
  }

  changeThemeOnClick(themeButton) {
    // localStorage 저장
    themeButton.addEventListener('click', () => {
      if (localStorage.getItem('theme') === 'theme-dark') {
        this.setTheme('theme-light');
      } else {
        this.setTheme('theme-dark');
      }
    });
  }

  renderCurrentTheme() {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    console.log(userPrefersDark);
    if (localStorage.getItem('theme') === 'theme-dark') {
      this.setTheme('theme-dark');
      this.element.querySelector('#theme').checked = true;
    } else {
      this.setTheme('theme-light');
      this.element.querySelector('#theme').checked = false;
    }
  }

  render() {
    const themeButton = this.element.querySelector('.theme-button');
    this.changeThemeOnClick(themeButton);
    this.renderCurrentTheme();
  }
}
