const API_URL = "https://trip-wiki-api.vercel.app/";

//LIST API
export const request = async (startIdx, region, sortBy, searchWord) => {
  try {
    let url = `${API_URL}`;
    if (region && region !== "All") {
      url += `${region}?start=${startIdx}`;
    } else {
      url += `?start=${startIdx}`;
    }
    if (sortBy) {
      url += `&sort=${sortBy}`;
    }
    if (searchWord) {
      url += `&search=${searchWord}`;
    }
    // console.log(url);
    //API 호출
    const response = await fetch(url);
    if (response) {
      let data = await response.json();
      //   console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const requestCityDetail = async (id) => {
  try {
    const res = await fetch(`${API_URL}/city/${id}`);

    if (res) {
      let data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
