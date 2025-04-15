export default function RegionList($app) {
  this.state = {};
  this.$target = document.createElement("div");
  this.$target.className = "region-list";
  //   $app.appendChild(this.$target);
  this.template = () => {};
  this.render = () => {};
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
}
