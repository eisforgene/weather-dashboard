var apiKey = "ec068ec2b1a3152772ec0cdd7e170469"; // 2 added apiKey 

var previousHistory = JSON.parse(localStorage.getItem("weatherAPI")) || [] // 14 create local storage variable

displayHistory(); // 15 display history function

// 1 added jQuery function for searchBtn // vanilla JS - document.get - addEvent, callback
$("#searchBtn").on("click",function(event){
    event.preventDefault()
    var userInput = $("#city").val.trim()  // same as .value in JS // create variable userInput and assign id to "#city" (value in text input);
    forecast(userInput) // 3 calling forecast function
});

function forecast(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial` // 2 added https to pull from website, then we included a parameter (cityname)
    $.ajax({ // 4 method to place an API call through jQuery
        method:"GET",
        url:queryURL
    }).then(function(response) { // 5 only responds to the code after when using .then
        console.log(response)
        if(previousHistory.indexOf(cityName) === -1){
            previousHistory.push(cityName)
            localStorage.setItem("weatherAPI",JSON.stringify(previousHistory))
            displayHistory(); // added feature to display history
        }
        // 6 created #today and put it into html where we want content displayed
        $("#today").html(`<div>
        <h1>City: ${response.name}<span><img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"</span></h1>
        <h6>Temp: ${response.main.temp}</h6>
        <h6>Wind Speed: ${response.wind.speed}</h6>
        <h6>Weather: ${response.weather[0].description}</h6>
        <h6>Humidity: ${response.main.humidity}</h6>
        </div>`)
        // 7 created variable for latitude and longitude
        var lat = response.coord.lat
        var lon = response.coord.lon
        var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial` // 8 created ${} endpoints for lat, lon and APIkey
        
        $.ajax({ // 9 method to place an API call through jQuery
            method:"GET",
            url:url
        }).then(function(result) { // 10 only responds to the code after when using .then
            console.log(result)
            var currentUvi = result.current.uvi
            $("#uvi").html(`<h6 id="index">UV: ${currentUvi}</h6>`)
            if (currentUvi >= 11) { // 11 added background colors to css to display ranges
                $("#index").addClass("purple")
            } else if(currentUvi >= 8) {
                $("#index").addClass("red")
            } else if(currentUvi >= 6) {
                $("#index").addClass("orange")
            } else if(currentUvi >= 3) {
                $("#index").addClass("yellow")
            } else if(currentUvi >= 0) {
                $("#index").addClass("green")
            } 

            // 12 created empty string variable for html and variable for apiData to write 'result.daily' for the api endpoint
            var html = ""
            var apiData = result.daily
            // 13 created for loop to display forecast
            for (var i=0; i < apiData.length - 3; i++) {
                html += `<div class="card bg-primary m-3 p-3" style="min-width: 18rem;">
                <h1><span><img src="https://openweathermap.org/img/wn/${apiData[i].weather[0].icon}@2x.png"</span></h1>
                <h6>Temp: ${apiData[i].temp.day}</h6>
                <h6>Wind Speed: ${apiData[i].wind_speed}</h6>
                <h6>Weather: ${apiData[i].weather[0].description}</h6>
                <h6>Humidity: ${apiData[i].humidity}</h6>
                </div>`
            }
            $("#five-day").html(html)
        })
    })
};

function displayHistory(){ // 15 display previous history in first column
    var previousHistory = JSON.parse(localStorage.getItem("weatherAPI")) || []
    var html = "";
    for (var i=0; i < previousHistory.length; i++) {
        html+=`<h6><button class="previous btn btn-secondary m-2 w-100">${previousHistory[i]}</button></h6>`
    }

    $("#previousSearch").html(html)
}

// 16 able to view previous searches weather
$("#previousSearch").on("click",".previous",function(){
    var city = $(this).text()
    console.log(city)
    forecast(city)
});
