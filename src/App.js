console.log('app is running!');

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        // loading cat pics
        this.setState({
          data: null,
          loading: true,
        });

        // loaded cat pics
        api.fetchCats(keyword).then(({ data }) =>
          this.setState({
            data,
            loading: false,
          })
        );
      },

      onRandomCats: () => {
        // loading cat pics
        this.setState({
          data: null,
          loading: true,
        });

        // loaded cat pics
        api.fetchRandomCats().then(({ data }) =>
          this.setState({
            data,
            loading: false,
          })
        );
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        api.fetchCatDetail(image.id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            image: data,
          });
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
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
