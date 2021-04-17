"use strict";
const enterKey = document.getElementById("searchBar");
enterKey.addEventListener("keypress", function (e){
	if (e.key === 'Enter'){
		userInput();
	}
})
function userInput(){
	let userAnswer = document.getElementById("searchBar").value;
	
	var x = document.getElementById('testOne');
	var y  = document.getElementById('type');
	var z = document.getElementById('latest');
	var a = document.getElementById('stockName');
	var b = document.getElementById('timezone');
	var c = document.getElementById('high');
	var d = document.getElementById('low');
	var e = document.getElementById('close');
	var f = document.getElementById('volume');

fetch("https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol="+userAnswer+"&outputsize=compact&datatype=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "61efced3d5msh472b6c67f74d0c4p137c82jsn1e658fc428c4",
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
	}
})
.then(function(response) {
	return response.json();
})
.then(function(data) {
	console.log(data);
	let metaData = data["Meta Data"];
	let information = metaData["1. Information"];
	let symbol = metaData["2. Symbol"];
	let lastDate = metaData["3. Last Refreshed"];
	let timeZone = metaData["5. Time Zone"];

	let timeSeries =data["Time Series (Daily)"];
	let dailyResult = timeSeries[lastDate];

	let open = dailyResult["1. open"];
	open = open.substring(0, open.length - 2);
	open = open.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let high = dailyResult["2. high"];
	high = high.substring(0, high.length - 2);
	high = high.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let low = dailyResult["3. low"];
	low = low.substring(0, low.length - 2);
	low = low.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let close = dailyResult["4. close"];
	close = close.substring(0, close.length - 2);
	close = close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let volume = dailyResult["5. volume"];
	volume = volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	x.innerHTML = open;
	y.innerHTML = information;
	z.innerHTML = lastDate;
	a.innerHTML = symbol;
	b.innerHTML = timeZone;
	c.innerHTML = high;
	d.innerHTML = low;
	e.innerHTML = close;
	f.innerHTML = volume;
})
.catch(err => {
	console.error(err);
	x.innerHTML = "error";
	y.innerHTML = "error";
	z.innerHTML = "error";
	a.innerHTML = "error";
	b.innerHTML = "error";
	c.innerHTML = "error";
	d.innerHTML = "error";
	e.innerHTML = "error";
	f.innerHTML = "error";
});


}