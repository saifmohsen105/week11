var inputSearch = document.querySelector("#inputSearch");
var row = document.querySelector(".row");
var btmSubmit = document.querySelector("button");
var data = [];
var day = document.querySelectorAll(".day");
var date = document.querySelectorAll(".date");
var state = document.querySelectorAll(".state");
var degree = document.querySelectorAll(".degree");
var place = document.querySelector(".place");
var img = document.querySelectorAll(".icon");
var inputEmail = document.querySelector("#inputEmail");
console.log(inputEmail);

const mounth = [
  "jaunary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "Jule",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


btmSubmit.addEventListener("click", function () {
  getData();
});
 async function getData() {
  if (inputSearch.value.length >= 3) {
    try{
      
    data = await (await fetch(`https:api.weatherapi.com/v1/forecast.json?key=1dcea41643a340b3ae1112851240212&q=${inputSearch.value}&days=3`)).json();
    display();
    }catch(err){
    console.log('The base is wrong');
    }
  }
}
function display() {
  var today = new Date();
  for (var i = 0; i < data.forecast.forecastday.length; i++) {
    day[i].innerHTML = days[today.getDay() + i];
    switch (today.getDay() + i) {
      case 7:
        day[i].innerHTML = days[0];
    }
    switch (i) {
      case 0:
        place.innerHTML = data.location.name;
        date[i].innerHTML = today.getDay() + 1 + mounth[today.getMonth()];
        degree[i].innerHTML = data.current.temp_c + "<sup>o</sup>C";
        img[i].src = data.current.condition.icon;
        state[i].innerHTML = data.current.condition.text;
        break;
      default:
        degree[i].innerHTML =
          data.forecast.forecastday[i].day.maxtemp_c + "<sup>o</sup>C";
        img[i].src = data.forecast.forecastday[i].day.condition.icon;
        state[i].innerHTML = data.forecast.forecastday[i].day.condition.text;
    }
  }
  row.style = "  visibility:  visible;";
}

function checkEmail() {
  var emailRegix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (inputEmail.value != emailRegix.test(inputEmail.value)) {
    console.log("no");
  }
}
