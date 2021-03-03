class SearchInput {
  keywords = [];
  constructor({ $target, onSearch }) {
    // html 만들기
    const template = document.createElement('template');
    template.innerHTML = `
        <header>
          <h1>JIBSA</h1>
          <div class"search-box">
            <input type="text" class='search-input'/>
          </div>
          <ul class="search-history"></ul>
        </header>
      `;
    this.element = template.content.firstElementChild;

    // input 속성 부여하기
    const input = this.element.querySelector('.search-input');
    input.placeholder = '고양이를 검색해보세요.';
    input.autofocus = true;

    // 검색 이벤트
    input.addEventListener('keyup', (e) => {
      const value = e.target.value;
      if (value && e.keyCode === 13) {
        // API 불러오기
        onSearch(value);

        // 검색어 5개 넘으면 자르기
        if (this.keywords.length >= 5) {
          this.keywords.pop();
        }

        this.keywords.unshift(value); // 검색어 -> 배열
        this.setHistory(this.keywords); // 배열 -> localStorage
        this.printHistory(this.keywords); // localStorage -> html
        e.target.value = '';
      }
    });

    // 검색창 클릭 시 초기화
    input.addEventListener('click', (e) => {
      const value = e.target.value;
      if (value) {
        e.target.value = '';
      }
    });

    console.log('SearchInput created.', this);
    $target.appendChild(this.element);
    this.render();
  }

  setHistory(keywordArray) {
    localStorage.setItem('HISTORY', JSON.stringify(keywordArray));
  }

  getHistory() {
    const keywords = JSON.parse(localStorage.getItem('HISTORY')) || [];
    this.keywords = keywords;

    this.printHistory(this.keywords);
  }

  printHistory(keywords) {
    // 최근 검색어 목록 출력
    const list = this.element.querySelector('.search-history');
    list.innerHTML = '';
    keywords.map((keyword) => {
      const item = document.createElement('li');
      item.textContent = keyword;
      list.appendChild(item);
    });
  }

  render() {
    this.getHistory();
  }
}
