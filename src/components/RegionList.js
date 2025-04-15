export default function RegionList({ $app, initialState, handleRegionChange }) {
  this.state = initialState;
  this.handleRegionChange = handleRegionChange;
  this.$target = document.createElement("div");
  this.$target.className = "region-list";
  $app.appendChild(this.$target);
  this.template = () => {
    let region = [
      "All",
      "Asia",
      "Middle-East",
      "Europe",
      "Latin-America",
      "Africa",
      "North-America",
      "Oceania",
    ];
    let temp = "";
    region.forEach((item) => {
      temp += `<div id=${item}>${item}</div>`;
    });
    return temp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
    const regionList = this.$target.querySelectorAll("div");
    const selectRegion = document.getElementById(this.state);
    if (selectRegion) {
      selectRegion.className = "clicked";
    }

    regionList.forEach((elm) => {
      elm.addEventListener("click", async () => {
        await this.handleRegionChange(elm.id);
      });
    });
  };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
