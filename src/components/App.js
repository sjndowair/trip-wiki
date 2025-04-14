import Header from "./Header.js";
import RegionList from "./RegionList.js";
import CityList from "./CityList.js";
import CityDetail from "./CityDetail.js";

export default function App() {
  this.state = {};
  const header = new Header();
  const regionList = new RegionList();
  const cityList = new CityList();
  const cityDetail = new CityDetail();

  this.setState = (newState) => {
    this.state = newState;
  };

  const init = () => {};
  init();
}
