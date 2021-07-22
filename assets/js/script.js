var apiKey = "ec068ec2b1a3152772ec0cdd7e170469"; // 2 added apiKey 




// 1 added jQuery function for searchBtn // vanilla JS - document.get - addEvent, callback
$("#searchBtn").on("click",function(event){
    event.preventDefault()
    var userInput = $("#city").val()  // same as .value in JS // create variable userInput and assign id to "#city" (value in text input);
    forecast(userInput) // 3 calling forecast function
});

function forecast(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial` // 2 added https to pull from website, then we included a parament (cityname)
    $.ajax({ // 4 method to place an API call through jQuery
        method:"GET",
        url:queryURL
    }).then(function(response) { // only responds to the code after when using .then
        console.log(response)
    })
};

