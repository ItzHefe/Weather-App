// Weather App
var city="";
var submitBtnEl = $('#submit-Btn');
var userSearchEl = $('#city-input');
var resultsCityEl = $('#city-result');
var resultContentEl = $('#result-content');
var cityTemp = $('#temperature');
var cityHumidty= $('#humidity');
var cityWind= $('#wind-speed');
var cityUv= $('#uv-index');
var apiKey ='fd4dd3400bebdf41d0142da9d25aef0d';
var lsCity=[];

//fetch testing: Atlanta (Geocoding API to pass to One Call API)
fetch (
    'http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=5&appid=fd4dd3400bebdf41d0142da9d25aef0d'
)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
//returns 5 cities... need to pass information in the search bar to user to ensure they are selecting the right city.

//Testing OneCall API to Pass in LAN/LON
fetch (
    'https://api.openweathermap.org/data/2.5/onecall?lat=33.7489924&lon=-84.3902644&limit=1&appid=fd4dd3400bebdf41d0142da9d25aef0d'
)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  //Testing current weather API
fetch (
    'https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=fd4dd3400bebdf41d0142da9d25aef0d'
)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  //localStorage check element
function find (c) {
    for (var i=0; i<lsCity.length; i++) {
        if(c.toUppercase()===lsCity[i]) {
            return -1;
        }
    }
    return 1;
}
//click on submit button to run function based on user input
$("#submit-Btn").on("click", displayWeather);
function displayWeather(event){
    event.preventDefault();
    if(userSearchEl.val().trim()!==""){
        city=userSearchEl.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + apiKey;
    $.ajax({
        url:queryURL,
        method:'GET',
    }).then(function(response){
        console.log(response);
        var weatherIcon= response.weather[0].icon;
        var iconURL="https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
        // date format is taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        var date= new Date(response.dt*1000).toLocaleDateString();
        $(resultsCityEl).html(response.name +"("+date+")" + "<img src="+iconURL+">");

        $(cityTemp).html((response.main.temp).toFixed(2)+"&#8457");
        // Display the Humidity
        $(cityHumidty).html(response.main.humidity+"%");
        //Display Wind speed
        $(cityWind).html(response.wind.speed+"MPH");
    });
};

//Function: DoResults
//3.call function add 5 day results
//4. clear out the text box


//RECENT SEARCH
// function: add search term to results
// parameter in: search term
//1. add a button to the screen, with a data attribute that stores the search term

// Function: EVENT HANDLER
//1. read the data attribute to get the search term
//2. Call search function


//RESULTS TODAY
//function add todays results


//Results 5 days
//function add 5 days results