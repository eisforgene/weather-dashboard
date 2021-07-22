// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// vanilla JS - document.get - addEvent, callback

// 1 added jQuery function for searchBtn
$("#searchBtn").on("click",function(event){
    event.preventDefault()
    var userInput = $("#city").val()  // same as .value in JS // create variable userInput and assign id to "#city" (value in text input);
    console.log(userInput)
});