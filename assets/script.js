$(document).ready(function () {

    var arrayOfCityNames = [];
    // button function for search
    $("#add-city").on("click", function (event) {
        event.preventDefault();
        // City object
        var city = $("#cityInput").val().trim();
        console.log(city);
        // pushes city into city array
        arrayOfCityNames.push(city);
        // hopefully storing in local on the 
        localStorage.setItem(cityNames, cityNames);
        localStorage.getItem(cityNames);
        // renderListItems();
        // for (var i = 0; i < cityName.length; i++) {
        var userInput = $("<li>", {
            class: "list-group-item",
            click: function () {
                //when you console.log it shows when it's clicked, which city is being clicked
                console.log($(this));
                //this passes this element in this argument
                displayWeatherInfo(event, this);
            }
        })
        // 
        userInput.addClass("newCity");
        UserInput.attr("data-name", city);
        UserInput.text(city)
        // Change to prepend when ready
        $("#cityList").append(UserInput);
    });
// displays weather info in jumbotron and pulls from the API
function displayWeatherInfo(event, element) {
    console.log(event, element)
    var APIKey = "f7260b0580dc94670030951a250ac329";
    var city = $(element).text();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
       
        
    })
}






});