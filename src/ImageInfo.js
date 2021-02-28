class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
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
      this.$imageInfo.style.display = 'block';
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
