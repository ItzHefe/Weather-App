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
        //pull coords from original call and add them to local storage
        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            lsCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(lsCity);
            if (lsCity==null){
                lsCity=[];
                lsCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(lsCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    lsCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(lsCity));
                    addToList(city);
                }
            }
        }
    });
};
function UVIndex(ln,lt){
    //URL for OneCall API to pull in UV index to screen
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $(cityUv).html(response.value);
            });
}

// function add 5 day results
function forecast(cityid){
    var forcastURL="https://api.openweathermap.org/data/2.5/forecast?units=imperial&id=" + cityid + "&appid=" + apiKey;
    $.ajax({
        url:forcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0; i<5; i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconCode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconURL="https://openweathermap.org/img/wn/"+iconCode+".png";
            var temp= response.list[((i+1)*8)-1].main.temp;
            var humidity= response.list[((i+1)*8)-1].main.humidity;
            //displaying on the 5 day cards
            $("#fDate"+i).html(date);
            $("#fImg"+i).html("<img src="+iconURL+">");
            $("#fTemp"+i).html(temp+"&#8457");
            $("#fHumidity"+i).html(humidity+"%");
        }
    });
}


//RECENT SEARCH
// function: add search term to results
// parameter in: search term
//1. add a button to the screen, with a data attribute that stores the search term

// Function: EVENT HANDLER
//1. read the data attribute to get the search term
//2. Call search function
