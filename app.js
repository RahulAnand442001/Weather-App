//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//076016817e5a6cc4f6f3e097b95dc4f0
console.log("Weather App script initiated");

const weatherApi = {
	key: "076016817e5a6cc4f6f3e097b95dc4f0",
	baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

// get location name from input box
document.getElementById("searchForm").addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		let city = e.target.value;
		getWeatherReport(city);
	}
});

//get weather Report
function getWeatherReport(city) {
	fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
		.then((res) => {
			return res.json();
		})
		.then((res) => showWeatherReport(res));
}

//Show weather report
function showWeatherReport(weather) {
	console.log(weather);

	let city = document.getElementById("city");
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let temperature = document.getElementById("temp");
	temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

	let minMaxTemp = document.getElementById("min-max");
	minMaxTemp.innerHTML = `${Math.floor(
		weather.main.temp_min,
	)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

	let weatherType = document.getElementById("weather");
	weatherType.innerText = `${weather.weather[0].main}`;

	let date = document.getElementById("date");
	let todayDate = new Date();
	date.innerText = dateManage(todayDate);

	// display weather box after box
	const weatherBody = document.querySelector(".Weather-body");
	weatherBody.style.display = "block";
}

//date manage
function dateManage(dateArg) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let year = dateArg.getFullYear();
	let month = months[dateArg.getMonth()];
	let date = dateArg.getDate();
	let day = days[dateArg.getDay()];

	return `${date} ${month} (${day}), ${year}`;
}
