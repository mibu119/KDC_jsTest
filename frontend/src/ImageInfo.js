import api from "./api.js";

class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  // async await 써보기
  async showDetail(data) {
    const detailInfo = await api.fetchCatDetail(data.cat.id);
    if (detailInfo) {
      this.setState({
        visible: true,
        cat: detailInfo.data,
      });
    }
    // 상세 정보 요청
    // api.fetchCatDetail(data.cat.id).then(({ data }) => {
    //   // 정보를 업데이트
    //   this.setState({
    //     visible: true,
    //     cat: data,
    //   });
    // });
  }

  closeImageInfo() {
    this.setState({
      visible: false,
      cat: undefined,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      // TODO: keypress, keydown, keyup 차이 검색
      // keypress는 esc를 인식하지 못하고, keydown은 esc를 인식함.
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeImageInfo();
        }
      });

      this.$imageInfo.addEventListener("click", (e) => {
        (e.target.className === "ImageInfo" ||
          e.target.className === "close") &&
          this.closeImageInfo();
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
export default ImageInfo;
