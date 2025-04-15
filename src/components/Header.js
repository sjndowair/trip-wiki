export default function Header({
  $app,
  initialState,
  handleSortChange,
  handleSearch,
}) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "header";
  $app.appendChild(this.$target);

  this.handleSortChange = handleSortChange;
  this.handleSearch = handleSearch;

  this.template = () => {
    const { sortBy, searchWorld } = this.state;
    console.log(searchWorld);

    let temp = `
    <div class="title">
       <a href="/">✈️ Trip Wiki </a>
    </div>
    <div class="filter-search-container">
        <div class="filter">
        <select id="sortList" class="sort-list">
        <option value="total" ${
          sortBy === "total" ? "selected" : ""
        } >Total</option>
        <option value="cost" ${
          sortBy === "cost" ? "selected" : ""
        }>Cost</option>
        <option value="fun" ${sortBy === "fun" ? "selected" : ""}>Fun</option>
        <option value="safety" ${
          sortBy === "safety" ? "selected" : ""
        }>Safety</option>
        <option value="internet" ${
          sortBy === "internet" ? "selected" : ""
        }>Internet</option>
        <option value="airQuality" ${
          sortBy === "airQuality" ? "selected" : ""
        }>Air Quality</option>
        <option value="food" ${
          sortBy === "food" ? "selected" : ""
        }>Food</option>
        </select>
        </div>
        <div class="search">
        <input type="text" placeholder="Search" id="search" autocomplete="off" value=${
          searchWorld || ""
        }  />
        </div>
    </div>
    `;
    return temp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
    document.getElementById("sortList").addEventListener("change", (event) => {
      this.handleSortChange(event.target.value);
    });
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleSearch(searchInput?.value);
      }
    });
  };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
