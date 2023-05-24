console.log("app is running!");

import Loading from "./Loading.js";
import DarkModeToggle from "./DarkModeToggle.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import api from "./api.js";

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        // 로딩 show
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data ? data : []);
          this.Loading.hide();
          // 로컬에 저장
          this.saveResult(data);
        });
        // 로딩 hide
      },
      onRandomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      onNextPage: () => {
        this.Loading.show();
        const keywordHistory =
          localStorage.getItem("keywordHistory") === null
            ? []
            : localStorage.getItem("keywordHistory").split(",");

        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;
        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState({
            items: newData,
            page: page,
          });
          this.Loading.hide();
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

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem("lastResult") === null
        ? []
        : JSON.parse(localStorage.getItem("lastResult"));

    this.setState(lastResult);
  }
}

export default App;
