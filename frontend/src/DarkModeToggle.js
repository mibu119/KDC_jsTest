class DarkModeToggle {
  constructor({ $target }) {
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("change", (e) => {
      console.dir(e.target);
    });
  }
  render() {}
}
