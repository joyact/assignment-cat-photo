import ImageInfo from './components/ImageInfo.js';
import Header from './components/Header.js';
import SearchResult from './components/SearchResult.js';
import { api } from './API/api.js';

console.log('app is running!');

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.Header = new Header({
      $target,
      onSearch: async (keyword) => {
        // 로딩 중
        this.setState({
          loading: true,
          data: null,
        });

        // 로딩 완료
        const response = await api.fetchCats(keyword);
        if (response) {
          this.setState({
            loading: false,
            data: response.data,
          });
        }
      },
      onRandom: async () => {
        // 로딩 중
        this.setState({
          loading: true,
          data: null,
        });

        // 로딩 완료
        const response = await api.fetchRandomCats();
        if (response) {
          this.setState({
            loading: false,
            data: response.data,
          });
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        const response = await api.fetchCat(image.id);
        this.imageInfo.setState({
          visible: true,
          image: response.data,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      onClose: () => {
        this.imageInfo.setState({
          visible: false,
        });
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
