class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "KeywordHistory";
    $target.appendChild(this.$keywordHistory);

    this.onSearch = onSearch;
    this.init();
    this.render();
  }

  //데이터 초기화
  init() {
    // let dummy = ["아", "고양이", "cat"];
    const data =
      localStorage.getItem("keywordHistory") === null
        ? []
        : localStorage.getItem("keywordHistory").split(",");
    this.setState(data);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
        <li><button>${keyword}</button></li>
        `
      )
      .join("");

    this.$keywordHistory
      .querySelectorAll("li button")
      .forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onSearch(this.data[index]);
        });
      });
  }
}
