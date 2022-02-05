// Weather App
var submitBtnEl = document.querySelector('#submit-Btn');
var userSearchEl = document.querySelector('#city-input');
var resultsCityEl = document.querySelector('#city-result');
var resultContentEl = document.querySelector('#result-content');
//fetch call
// async getCurrent (input) {
//     var apiKey = "fd4dd3400bebdf41d0142da9d25aef0d";

//     //generate the URL

//     var response = await fetch(
//         'api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}'
//     );

//     var data = await response.json();
//     console.log(data);
//     return data;
// }

//Search Bar
//submitBtnEl.addEventListener('click', newSearch);
//1. read the value from the search bar into a variable - userSearchEl
//2. create URL to fetch
fetch (
    'api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=fd4dd3400bebdf41d0142da9d25aef0d'
)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
//3. fetch the results
//4. Call Function to update after results


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