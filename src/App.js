import ImageInfo from './components/ImageInfo.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import { api } from './API/api.js';

console.log('app is running!');

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        const response = await api.fetchCats(keyword);
        if (response) {
          this.setState(response.data);
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
