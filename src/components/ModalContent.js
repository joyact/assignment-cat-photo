import { BaseComponent } from './BaseComponent.js';

export class ModalContent extends BaseComponent {
  constructor(modalData) {
    const { name, url, temperament, origin } = modalData;
    super(`
      <div class="content-wrapper">
        <div class="title">
          <span>${name}</span>
          <div class="close">x</div>
        </div>
        <img src="${url}" alt="${name}"/>        
        <div class="description">
          <div>성격: ${temperament}</div>
          <div>태생: ${origin}</div>
        </div>
      </div>
    `);
  }
}
