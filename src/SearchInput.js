class SearchInput {
  keywords = [];
  constructor({ $target, onSearch }) {
    // html 만들기
    const template = document.createElement('template');
    template.innerHTML = `
        <header>
          <h1>JIBSA</h1>
          <div class="search-box">
            <input type="text" class='search-input'/>
            <ul class="search-history"></ul>
          </div>
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
      if (e.keyCode === 13) {
        onSearch(value); // API 불러오기

        this.keywords.push(value); // 검색어 저장
        this.setHistory(this.keywords);
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
    const keyword = JSON.parse(localStorage.getItem('HISTORY')) || [];
    this.keywords = keyword;
  }

  render() {
    this.getHistory();
  }
}
