const apiKey = "5632fc51c68d6debe7e838d81a0873ba";
const URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherType = document.querySelector(".type");

async function checkWeather(city) {
  const response = await fetch(URL + city + `&appid=${apiKey}`);

  if (response.status == 404) { //for Error Or Invalid City
    document.querySelector(".error").style.display = "block"; //Error Msg Will Show
    document.querySelector(".weather").style.display = "none"; //Weather Will not Show for Invalid City

    setTimeout(() => {  //Time Out function for Weather and Error Msg
      document.querySelector(".error").style.display = "none";  
      document.querySelector(".weather").style.display = "none";
    }, 2500);
  } else { //For Correct
    var data = await response.json();

    console.log(data)

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels").innerHTML = Math.round(data.main.feels_like )+ "°C";


    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      weatherType.textContent = "Cloudy";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      weatherType.textContent = "Clear";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      weatherType.textContent = "Rainy";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/Mist.png";
      weatherType.textContent = "Mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/Drizzle.png";
      weatherType.textContent = "Drizzle";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "images/haze.png";
      weatherType.textContent = "Haze";
    }

    document.querySelector(".weather").style.display = "block"; // Wather Will Show
    document.querySelector(".error").style.display = "none"; //Error Msg Will not Show
  }
}


//When Enter Key is pressed ...
searchBox.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        document.querySelector(".msg").style.display = "block"; //Initial MSG will show
        setTimeout(() => {
          document.querySelector(".msg").style.display = "none"; //Initial MSG will not show
          checkWeather(searchBox.value);
        }, 2500);
    }
})


//when search button is pressed
searchBtn.addEventListener("click", () => {
  document.querySelector(".msg").style.display = "block"; //Initial MSG will show
  setTimeout(() => {
    document.querySelector(".msg").style.display = "none"; //Initial MSG will not show
    checkWeather(searchBox.value);
  }, 2500);
});
