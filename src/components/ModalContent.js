import { BaseComponent } from './BaseComponent.js';

export class ModalContent extends BaseComponent {
  constructor(modalData) {
    const { name, url, temperament, origin } = modalData;
    super(`
      <figure class="modal-box">
        <div class="title-wrapper">
          <h3 class="title">${name}</h3>
          <button class="close">X</button>
        </div>
        <img src="${url}" alt="${name}" class="cat-photo"/>        
        <figcaption class="description">
          <span><b>성격</b>: ${temperament}</span>
          <span><b>태생</b>: ${origin}</span>
        </figcaption>
      </figure>
    `);
  }
}
