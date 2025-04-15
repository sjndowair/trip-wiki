import Header from "./Header.js";
import RegionList from "./RegionList.js";
import CityList from "./CityList.js";
import CityDetail from "./CityDetail.js";
import { request } from "./api.js";

export default function App($app) {
  const getSortBy = () => {
    if (window.location.search) {
      return window.location.search.split("sort=")[1].split("&")[0];
    }
    return "total";
  };

  console.log(getSortBy());

  const getSearchWorld = () => {
    if (window.location.search && window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  this.state = {
    startIdx: 0,
    sortBy: getSortBy(),
    searchWorld: getSearchWorld(),
    region: "",
    cities: "",
  };

  const header = new Header({
    $app,
    initialState: {
      sortBy: this.state.sortBy,
      searchWorld: this.state.searchWorld,
    },
    handleSortChange: async (sortBy) => {
      const pageUrl = `/${this.state.region}?sort=${sortBy}`;
      history.pushState(
        null,
        null,
        this.state.searchWorld
          ? pageUrl + `&search=${this.state.searchWorld}`
          : pageUrl
      );
      const cities = await request(
        0,
        this.state.region,
        sortBy,
        this.state.searchWorld
      );
      this.setState({
        ...this.state,
        startIdx: 0,
        sortBy: sortBy,
        cities: cities,
      });
    },
    handleSearch: async (searchWorld) => {
      history.pushState(
        null,
        null,
        `/${this.state.region}?sort=${this.state.sortBy}&search=${searchWorld}`
      );
      const cities = await request(
        0,
        this.state.region,
        this.state.sortBy,
        searchWorld
      );
      this.setState({
        ...this.state,
        startIdx: 0,
        searchWorld: searchWorld,
        cities: cities,
      });
    },
  });

  const regionList = new RegionList({
    $app,
    initialState: this.state.region,
    handleRegionChange: async (region) => {
      history.pushState(null, null, `/${region}`);
      const cities = await request(
        0,
        region,
        this.state.sortBy,
        this.state.searchWorld
      );
      this.setState({
        ...this.state,
        startIdx: 0,
        region: region,
        sortBy: this.state.sortBy,
        searchWorld: this.state.searchWorld,
        cities: cities,
      });
    },
  });

  const cityList = new CityList({
    $app,
    initialState: this.state.cities,
    handleLoadMore: async () => {
      const newStartIdx = this.state.startIdx + 40;
      const newCities = await request(
        newStartIdx,
        this.state.region,
        this.state.sortBy,
        this.state.searchWorld
      );
      this.setState({
        ...this.state,
        startIdx: newStartIdx,
        cities: {
          cities: [...this.state.cities.cities, ...newCities.cities],
          isEnd: newCities.isEnd,
        },
      });
    },
  });
  const cityDetail = new CityDetail();

  this.setState = (newState) => {
    this.state = newState;
    cityList.setState(this.state.cities);
    header.setState({
      sortBy: this.state.sortBy,
      searchWorld: this.state.searchWorld,
    });
    regionList.setState(this.state.region);
  };

  const init = async () => {
    try {
      const cities = await request(
        this.state.startIdx,
        this.state.region,
        this.state.sortBy,
        this.state.searchWorld
      );
      this.setState({
        ...this.state,
        cities: cities,
      });
    } catch (error) {
      console.log(error);
    }
  };
  init();
}
