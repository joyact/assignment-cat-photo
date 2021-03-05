import { BaseComponent } from './BaseComponent.js';

export class PhotoBox extends BaseComponent {
  constructor(catData) {
    const { id, url, name } = catData;
    super(`
        <div class="item" id="${id}">
          <img src=${url} alt=${name} />
        </div>
      `);
  }
}
// render() {
//   this.$searchResult.innerHTML = this.data
//     .map(
//       (cat) => `
//     <div class="item">
//       <img src=${cat.url} alt=${cat.name} />
//     </div>
//   `
//     )
//     .join('');

//   this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
//     $item.addEventListener('click', () => {
//       this.onClick(this.data[index]);
//     });
//   });
// }
