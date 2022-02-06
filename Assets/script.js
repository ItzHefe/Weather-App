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
//localStorage check element
function find (c) {
    for (var i=0; i<lsCity.length; i++) {
        if(c.toUppercase()===lsCity[i]) {
            return -1;
        }
    }
    return 1;
}

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


//Search Bar
//submitBtnEl.addEventListener('click', newSearch);
//1. read the value from the search bar into a variable - userSearchEl
//2. create URL to fetch
//3. fetch the results
//4. Call Function to update after results
function displayWeather(event){
    event.preventDefault();
    if(userSearchEl.val().trim()!==""){
        city=userSearchEl.val().trim();
        currentWeather(city);
    }
}


//Function: DoResults
//1. Call function add search term to results
//2. call function add today's results
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