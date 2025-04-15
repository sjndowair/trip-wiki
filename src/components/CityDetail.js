export default function CityList($app) {
  this.state = {};
  this.$target = document.createElement("div");
  this.$target.className = "city-detail";
  //   $app.appendChild(this.$target);
  this.template = () => {};
  this.render = () => {};
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
}
