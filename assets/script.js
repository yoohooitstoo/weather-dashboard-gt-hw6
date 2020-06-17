$(document).ready(function () {

    var arrayOfCityNames = [];
    // button function for search
    $("#newCity").on("click", function (event) {
        event.preventDefault();

        // City object
        var city = $("#cityInput").val().trim();
        console.log(city);
        // pushes city into city array
        arrayOfCityNames.push(city);
        // hopefully storing in local on the 
        // localStorage.setItem(cityNames, cityNames);
        // localStorage.getItem(cityNames);
        // renderListItems();
        // for (var i = 0; i < cityName.length; i++) {
        var userInput = $("<li>", {
            class: "list-group-item",
            click: function () {


                //when you console.log it shows when it's clicked, which city is being clicked
                // console.log($(this));
                //this passes this element in this argument
                displayWeatherInfo(event, this);

            }

        })
        // 
        userInput.addClass("newCity");
        userInput.attr("data-name", city);
        userInput.text(city)
        // Change to prepend when ready
        $("#cityList").append(userInput);
    });
    // displays weather info in jumbotron and pulls from the API
    function displayWeatherInfo(event, element) {
        // console.log(event, element);
        var APIKey = "f7260b0580dc94670030951a250ac329";
        var city = $(element).text();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            //Displays the city name in Jumbotron
            $(".currentCityName").append(response.name);
            //Displays the Icon
            var cityIconCode = response.weather[0].icon;
            var cityIconUrl = "http://openweathermap.org/img/w/" + cityIconCode + ".png";
            $("#cityIconUrl").attr("src", cityIconUrl);
            // Displays the Temp
            $("#cityTemp").append("Temperature: " + response.main.temp + " °F");
            // Displays the Speed
            $("#cityWindSpeed").append("Wind Speed: " + response.wind.speed + " mph");
            // Displays the Humidity
            $("#cityHumidity").append("Humidity: " + response.main.humidity + " %");

            //displays uv index after making 2nd api call
            var cityLon = response.coord.lon
            var cityLat = response.coord.lat
            var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response2) {
                // console.log(response2);

                

                $("#cityUvIndex").append("UV Index: ").append($("#cityUvIndexNumbers").append(response2.value));

                var cityUvIndex = response2.value;

                if (cityUvIndex < 3) {
                    $("#cityUvIndexNumbers").addClass("green");
                } else if (cityUvIndex < 7) {
                    $("#cityUvIndexNumbers").addClass("orange");
                } else {
                    $("#cityUvIndexNumbers").addClass("red");
                };
                

            });
            // 3rd api call to display multiple weather forecasts
            var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response3) {
                console.log(response3);
                // console.log(response3.list[0].dt_txt);
                



            });
        })
    }






});