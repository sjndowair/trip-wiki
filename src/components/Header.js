export default function Header($app) {
  this.state = {};
  this.$target = document.createElement("div");
  this.$target.className = "header";
  $app.appendChild(this.$target);
  this.template = () => {};
  this.render = () => {};
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
}
