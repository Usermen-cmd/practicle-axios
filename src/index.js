import css from "./css/styles.css";
import axios from "axios";

import templ from "./templates/weather.hbs";

const refs = {
  weather: document.querySelector(".weather"),
  searchInput: document.querySelector(".search-bar"),
  searchBtn: document.querySelector(".search-btn"),
};

let baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
let apiKey = `b17a2dddb01d7481fea6373f92c2e546`;

class Fetch {
  constructor() {
    this.key = apiKey;
  }
  getDataWithAxios(cityName) {
    let params = `?q=${cityName}&appid=${this.key}`;
    axios
      .get(params)
      .then((d) => d.data)
      .then((result) => this.showWeather(result))
      .catch((error) => console.error(error));
  }
  getFetch(cityName) {
    let url = baseUrl + `?q=${cityName}&appid=${this.key}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert("Bad Request!!!");
          throw new Error("Bad Request!!!");
        } else {
          return response.json();
        }
      })
      .then((data) => this.showWeather(data));
  }
  showWeather(data) {
    const {
      name,
      main: { temp, humidity },
      weather: [weath],
      wind: { speed },
    } = data;
    const markUp = templ({ name, temp, weath, humidity, speed });
    refs.weather.insertAdjacentHTML("beforebegin", markUp);
  }
}

const myWeather = new Fetch();

refs.searchBtn.addEventListener("click", () => {
  let citySearch = refs.searchInput.value;

  myWeather.getFetch(citySearch);
});
