class Loading {
  constructor({ $target }) {
    const $loading = document.createElement("div");

    this.$loading = $loading;
    $target.appendChild(this.$loading);

    this.render();
  }

  render() {
    this.$loading.innerHTML = `
      <div class="Loading">
      <p>🐈로딩중...🐈</p>
      </div>
    `;
  }
}
