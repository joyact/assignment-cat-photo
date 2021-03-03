class ImageInfo {
  $imageInfo = null;
  data = null;
  // onClose = null;

  constructor({ $target, data, onClose }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;

    $target.appendChild($imageInfo);

    this.data = data;
    this.onClose = onClose;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const modal = document.querySelector('.ImageInfo');

    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;
      this.$imageInfo.innerHTML = `
        <figure class="content-wrapper">
          <div class="title-wrapper">
            <h3 class="title">${name}</h3>
            <button class="close">X</button>
          </div>
          <img src="${url}" alt="${name}" class="cat-photo"/>        
          <figcaption class="description">
            <span><b>성격</b>: ${temperament}</span>
            <span><b>태생</b>: ${origin}</span>
          </figcaption>
        </figure>`;

      modal.classList.add('active');

      const info = document.querySelector('.content-wrapper');
      const close = document.querySelector('.close');

      // close button click
      close.addEventListener('click', () => {
        modal.classList.remove('active');
        this.onClose();
      });

      // background click
      document.addEventListener('click', (e) => {
        if (e.target == modal && e.target !== info) {
          modal.classList.remove('active');
          this.onClose();
        }
      });

      // ESC key click
      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          modal.classList.remove('active');
          this.onClose();
        }
      });
    } else {
      modal.classList.remove('active');
    }
  }
}
