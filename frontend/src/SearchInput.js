const TEMPLATE = '<input type="text">';

import KeywordHistory from "./KeywordHistory.js";

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement("section");

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);
    $target.appendChild($wrapper);

    $searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
        // 최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    // 랜덤버튼
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = "랜덤 고양이";

    $randomButton.addEventListener("click", (e) => {
      onRandomSearch();
    });

    $wrapper.appendChild($randomButton);

    this.KeywordHistory = new KeywordHistory({
      $target,
      onSearch,
    });
  }
  render() {}
}

export default SearchInput;
