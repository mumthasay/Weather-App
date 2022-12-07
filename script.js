const formEl = document.querySelector(".form-div");
const inputEl = document.querySelector("#city-input");

getWeatherData = (city) => {
  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=imperial`;
  const weather = fetch(URL)
  return weather.then((response) => {
    return response.json()
  })
};

const dateAndTime = () => {
  const today = new Date();

  let day = today.getDay();
  const daylist = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = daylist[day];

  let date = today.getDate()
  if(date < 10){
    date = `0${date}`;
  }

  let month = today.getMonth();
  const monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
  month = monthList[month];

  let year = today.getFullYear();

  let hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  let prepand = hour >= 12 ? " PM " : " AM ";
  hour = hour >= 12 ? hour - 12 : hour;
  if (hour === 0 && prepand === " PM ") {
    if (minute === 0 && second === 0) {
      hour = 12;
      prepand = " Noon";
    } else {
      hour = 12;
      prepand = " PM";
    }
  }
  if (hour === 0 && prepand === " AM ") {
    if (minute === 0 && second === 0) {
      hour = 12;
      prepand = " Midnight";
    } else {
      hour = 12;
      prepand = " AM";
    }
  }

  return `${day} ${month} ${date} ${year} ${hour}:${minute}:${second} ${prepand}`
};

const currentDateTime = dateAndTime()

const showWeatherData = (data) => {
  document.getElementById("country").textContent = `${data["city"]["country"]}`;
  document.getElementById("humidity").textContent = `${data["list"][0]["main"]["humidity"]}%`;
  document.getElementById("wind").textContent = `${data["list"][0]["wind"]["speed"]}kmph`;
  document.getElementById("pressure").textContent = `${data["list"][0]["main"]["pressure"]}`;
  document.getElementById("temparature").textContent = `${data["list"][0]["main"]["temp"]}°`;
  document.getElementById("feels_like").textContent = `feels like ${data["list"][0]["main"]["feels_like"]}°`;
  document.getElementById("city-name").textContent = data["city"]["name"];
  document.getElementById("current_date_time").textContent = currentDateTime
  const icon = `${data["list"][0]["weather"][0]["icon"]}`
  const weatherIcon = `http://openweathermap.org/img/w/${icon}.png`
  document.getElementById("weather-symbol").innerHTML = `<img src = "${weatherIcon}">`
  document.getElementById("weather").textContent = `${data["list"][0]["weather"][0]["main"]}`
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  city = inputEl.value;
  getWeatherData(city).then((res) =>{
    showWeatherData(res)
  }).catch((error) => {
    console.log(error)
    console.log("something went wrong")
  })

  inputEl.value = ""
});
