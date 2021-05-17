"use strict";
const enterKey = document.getElementById("searchBar");
var graphName = document.getElementById("buttonChoice")
var graphType = "1. open";
graphName.innerHTML = "Dashboard";

enterKey.addEventListener("keypress", function (e){
	if (e.key === 'Enter'){
		userInput();
    graphName.innerHTML = "Open";
	}
})


function graphOpen(){
  graphType = "1. open";
  userInput();  
  graphName.innerHTML = "Open";
}

function graphHigh(){
  graphType = "2. high";
  userInput();
  graphName.innerHTML = "High";
}

function graphLow(){
  graphType = "3. low";
  userInput();
  graphName.innerHTML = "Low";
}

function graphClose(){
  graphType = "4. close";
  userInput();
  graphName.innerHTML = "Close";
}

function graphVolume(){
  graphType = "5. volume";
  userInput(); 
  graphName.innerHTML = "Volume";
}

function insertImage(open, high, low, close, volumeNumber, dateOneOpen, dateOneHigh, dateOneLow, dateOneClose, dateOneVolume){
  var imageOpen = document.getElementById("openArrow");
  var imageHigh = document.getElementById("highArrow");
  var imageLow = document.getElementById("lowArrow");
  var imageClose = document.getElementById("closeArrow");
  var imageVolume = document.getElementById("volumeArrow");
  
  open = parseFloat(open);
  high = parseFloat(high);
  low = parseFloat(low);
  close = parseFloat(close);
  volumeNumber = parseFloat(volumeNumber);
  dateOneOpen = parseFloat(dateOneOpen);
  dateOneHigh = parseFloat(dateOneHigh);
  dateOneLow = parseFloat(dateOneLow);
  dateOneClose = parseFloat(dateOneClose);
  dateOneVolume = parseFloat(dateOneVolume);
  
  if (open > dateOneOpen) {
    imageOpen.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png";
    imageOpen.style.height= "10px";
    imageOpen.style.widt="10px";
} else if (open < dateOneOpen){
    imageOpen.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png";
    imageOpen.style.height= "10px";
    imageOpen.style.widt="10px";
} else {
    imageOpen.src="https://img.favpng.com/0/24/3/dash-hyphen-at-sign-plus-and-minus-signs-png-favpng-YNwykATm8YBxYcJ2eiTNXBhmP.jpg";
    imageOpen.style.height= "10px";
    imageOpen.style.widt="10px";
}
  
    if (high > dateOneHigh) {
    imageHigh.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png";
    imageHigh.style.height= "10px";
    imageHigh.style.widt="10px";
} else if (high < dateOneHigh){
    imageHigh.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png";
    imageHigh.style.height= "10px";
    imageHigh.style.widt="10px";  
} else {
    imageHigh.src="https://img.favpng.com/0/24/3/dash-hyphen-at-sign-plus-and-minus-signs-png-favpng-YNwykATm8YBxYcJ2eiTNXBhmP.jpg";
    imageHigh.style.height= "10px";
    imageHigh.style.widt="10px";
}
    if (low > dateOneLow) {
    imageLow.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png";
    imageLow.style.height= "10px";
    imageLow.style.widt="10px";
} else if (low < dateOneLow){
    imageLow.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png";
    imageLow.style.height= "10px";
    imageLow.style.widt="10px";  
} else {
    imageLow.src="https://img.favpng.com/0/24/3/dash-hyphen-at-sign-plus-and-minus-signs-png-favpng-YNwykATm8YBxYcJ2eiTNXBhmP.jpg";
    imageLow.style.height= "10px";
    imageLow.style.widt="10px";
}
  
    if (close > dateOneClose) {
    imageClose.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png";
    imageClose.style.height= "10px";
    imageClose.style.widt="10px";
} else if (close < dateOneClose){
    imageClose.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png";
    imageClose.style.height= "10px";
    imageClose.style.widt="10px";
} else {
    imageClose.src="https://img.favpng.com/0/24/3/dash-hyphen-at-sign-plus-and-minus-signs-png-favpng-YNwykATm8YBxYcJ2eiTNXBhmP.jpg";
    imageClose.style.height= "10px";
    imageClose.style.widt="10px";
}
  
    if (volumeNumber > dateOneVolume) {
    imageVolume.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png";
    imageVolume.style.height= "10px";
    imageVolume.style.widt="10px";
} else if (volumeNumber < dateOneVolume){
    imageVolume.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png";
    imageVolume.style.height= "10px";
    imageVolume.style.widt="10px";
} else {
    imageVolume.src="https://img.favpng.com/0/24/3/dash-hyphen-at-sign-plus-and-minus-signs-png-favpng-YNwykATm8YBxYcJ2eiTNXBhmP.jpg";
    imageVolume.style.height= "10px";
    imageVolume.style.widt="10px";
}
  percentIncreaseAndDecrease(open, high, low, close, volumeNumber, dateOneOpen, dateOneHigh, dateOneLow, dateOneClose, dateOneVolume);
}

function percentIncreaseAndDecrease(open, high, low, close, volumeNumber, dateOneOpen, dateOneHigh, dateOneLow, dateOneClose, dateOneVolume){
  var openPercent = document.getElementById("openPercent");
  var highPercent = document.getElementById("highPercent");
  var lowPercent = document.getElementById("lowPercent");
  var closePercent = document.getElementById("closePercent");
  var volumePercent = document.getElementById("volumePercent");
  
  var openAnswer = (open - dateOneOpen)/dateOneOpen * 100;
  openAnswer = Math.round(openAnswer * 100)/100;
  
  if (openAnswer > 0){
    openAnswer = openAnswer.toString();
    openAnswer = openAnswer + "% ";
    openAnswer = openAnswer.fontcolor('green');
    openPercent.innerHTML = openAnswer;
  } else if (openAnswer < 0){
    openAnswer = openAnswer.toString();
    openAnswer = openAnswer + "% ";
    openAnswer = openAnswer.fontcolor('red');
    openPercent.innerHTML = openAnswer;
  } else {
    openAnswer = openAnswer.toString();
    openAnswer = openAnswer + "% ";
    openAnswer = openAnswer.fontcolor('gray');
    openPercent.innerHTML = openAnswer;
  }
  
  var highAnswer = (high - dateOneHigh)/dateOneHigh * 100;
  highAnswer = Math.round(highAnswer * 100)/100;
  
    if (highAnswer > 0){
    highAnswer = highAnswer.toString();
    highAnswer = highAnswer + "% ";
    highAnswer = highAnswer.fontcolor('green');
    highPercent.innerHTML = highAnswer;
  } else if (highAnswer < 0){
    highAnswer = highAnswer.toString();
    highAnswer = highAnswer + "% ";
    highAnswer = highAnswer.fontcolor('red');
    highPercent.innerHTML = highAnswer;
  } else {
    highAnswer = highAnswer.toString();
    highAnswer = highAnswer + "% ";
    highAnswer = highAnswer.fontcolor('gray');
    highPercent.innerHTML = highAnswer;
  }
  
  var lowAnswer = (low - dateOneLow)/dateOneLow * 100;
  lowAnswer = Math.round(lowAnswer * 100)/100;
  
  
  if (lowAnswer > 0){
    lowAnswer = lowAnswer.toString();
    lowAnswer = lowAnswer + "% ";
    lowAnswer = lowAnswer.fontcolor('green');
    lowPercent.innerHTML = lowAnswer;
  } else if (lowAnswer < 0){
    lowAnswer = lowAnswer.toString();
    lowAnswer = lowAnswer + "% ";
    lowAnswer = lowAnswer.fontcolor('red');
    lowPercent.innerHTML = lowAnswer;
  } else {
    lowAnswer = lowAnswer.toString();
    lowAnswer = lowAnswer + "% ";
    lowAnswer = lowAnswer.fontcolor('gray');
    lowPercent.innerHTML = lowAnswer;
  }
  
  var closeAnswer = (close - dateOneClose)/dateOneClose * 100;
  closeAnswer = Math.round(closeAnswer * 100)/100;
  
  
  if (closeAnswer > 0){
    closeAnswer = closeAnswer.toString();
    closeAnswer = closeAnswer + "% ";
    closeAnswer = closeAnswer.fontcolor('green');
    closePercent.innerHTML = closeAnswer;
  } else if (closeAnswer < 0){
    closeAnswer = closeAnswer.toString();
    closeAnswer = closeAnswer + "% ";
    closeAnswer = closeAnswer.fontcolor('red');
    closePercent.innerHTML = closeAnswer;
  } else {
    closeAnswer = closeAnswer.toString();
    closeAnswer = closeAnswer + "% ";
    closeAnswer = closeAnswer.fontcolor('gray');
    closePercent.innerHTML = closeAnswer;
  }
  
  var volumeAnswer = (volumeNumber - dateOneVolume)/dateOneVolume * 100;
  volumeAnswer = Math.round(volumeAnswer * 100)/100;
  
  if (volumeAnswer > 0){
    volumeAnswer = volumeAnswer.toString();
    volumeAnswer = volumeAnswer + "% ";
    volumeAnswer = volumeAnswer.fontcolor('green');
    volumePercent.innerHTML = volumeAnswer;
  } else if (volumeAnswer < 0){
    volumeAnswer = volumeAnswer.toString();
    volumeAnswer = volumeAnswer + "% ";
    volumeAnswer = volumeAnswer.fontcolor('red');
    volumePercent.innerHTML = volumeAnswer;
  } else {
    volumeAnswer = volumeAnswer.toString();
    volumeAnswer = volumeAnswer + "% ";
    volumeAnswer = volumeAnswer.fontcolor('gray');
    volumePercent.innerHTML = volumeAnswer;
  }
}

function userInput(){
	let userAnswer = document.getElementById("searchBar").value;
	
	var x = document.getElementById('open');
	var y  = document.getElementById('type');
	var z = document.getElementById('latest');
	var a = document.getElementById('stockName');
	// var b = document.getElementById('timezone');
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
  symbol = symbol.toUpperCase();
	let lastDate = metaData["3. Last Refreshed"];
	// let timeZone = metaData["5. Time Zone"];

	let timeSeries =data["Time Series (Daily)"];
	let dailyResult = timeSeries[lastDate];

	let open = dailyResult["1. open"];
	open = open.substring(0, open.length - 2);
	var openString = open.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let high = dailyResult["2. high"];
	high = high.substring(0, high.length - 2);
	var highString = high.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let low = dailyResult["3. low"];
	low = low.substring(0, low.length - 2);
	var lowString = low.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let close = dailyResult["4. close"];
	close = close.substring(0, close.length - 2);
	var closeString = close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let volume = dailyResult["5. volume"];
  var volumeNumber = volume;
	volume = volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  let dateOne = timeSeries["2021-04-05"];
  let dateTwo = timeSeries["2021-04-09"];
  let dateThree = timeSeries["2021-04-12"];
  let dateFour = timeSeries["2021-04-13"];
  let dateFive = timeSeries["2021-04-15"];
  let dateSix = timeSeries["2021-04-22"];
  let dateSeven = timeSeries[lastDate];
  
  var dateOneOpen = dateOne["1. open"];
  var dateOneHigh = dateOne["2. high"];
  var dateOneLow = dateOne["3. low"];
  var dateOneClose = dateOne["4. close"];
  var dateOneVolume = dateOne["5. volume"];
  
   dateOne = dateOne[graphType];
   dateTwo = dateTwo[graphType];
   dateThree= dateThree[graphType];
   dateFour = dateFour[graphType];
   dateFive = dateFive[graphType];
   dateSix= dateSix[graphType];
   dateSeven= dateSeven[graphType];


  /* globals Chart:false, feather:false */

  (function () {
  'use strict'

  feather.replace()

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        "2021-04-05",
        "2021-04-09",
        "2021-04-12",
        "2021-04-13",
        "2021-04-15",
        "2021-04-22",
        lastDate
      ],
      datasets: [{
        data: [
          dateOne,
          dateTwo,
          dateThree,
          dateFour,
          dateFive,
          dateSix,
          dateSeven
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()
 
	x.innerHTML = openString;
	y.innerHTML = information;
	z.innerHTML = lastDate;
	a.innerHTML = symbol;
	// b.innerHTML = timeZone;
	c.innerHTML = highString;
	d.innerHTML = lowString;
	e.innerHTML = closeString;
	f.innerHTML = volume;
   
  insertImage(open, high, low, close, volumeNumber, dateOneOpen, dateOneHigh, dateOneLow, dateOneClose, dateOneVolume);
})
.catch(err => {
	console.error(err);
	x.innerHTML = "error";
	y.innerHTML = "error";
	z.innerHTML = "error";
	a.innerHTML = "error";
	// b.innerHTML = "error";
	c.innerHTML = "error";
	d.innerHTML = "error";
	e.innerHTML = "error";
	f.innerHTML = "error";
});



  
  }
