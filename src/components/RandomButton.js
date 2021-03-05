import { BaseComponent } from './BaseComponent.js';

export default class RandomButton extends BaseComponent {
  constructor(onRandom) {
    super(`<button class="search-button">😻</button>`);

    this.onRandom = onRandom;
    this.element.addEventListener('click', () => {
      this.onRandom();
    });
  }
}
