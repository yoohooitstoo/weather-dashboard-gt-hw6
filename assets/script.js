$(document).ready(function () {


    // If there is something in local display on the page
    if (localStorage.getItem("searchedCityNames")) {
        let arrayOfCityNames = JSON.parse(localStorage.getItem("searchedCityNames"));
        // Need a for loop to go through the array
        for (var i = 0; i < arrayOfCityNames.length; i++) {
            var userInput = $("<li>", {
                class: "list-group-item",
                click: function () {

                    displayWeatherInfo(event, this);
                }
            })
            // List of user generated cities
            userInput.addClass("newCity");
            // Grabbing all the attributes attached city name at that index
            userInput.attr("data-name", arrayOfCityNames[i]);
            // 
            userInput.text(arrayOfCityNames[i]);
            // Change to prepend when ready
            $("#cityList").prepend(userInput);
        }
    }




    // button function for search
    $("#newCity").on("click", function (event) {
        event.preventDefault();
        // sets the city and removes any dead spaces
        var city = $("#cityInput").val().trim();
        
        //localStorage is empty so is NewcityNames
        if (!localStorage.searchedCityNames) {
            let arrayOfCityNames = []
            arrayOfCityNames.push(city)
            // Adding to the array is empty
            localStorage.setItem("searchedCityNames", JSON.stringify(arrayOfCityNames));
        } else {
            //  If there is already cities keeping adding
            let arrayOfCityNames = JSON.parse(localStorage.getItem("searchedCityNames"));
            arrayOfCityNames.push(city);
            localStorage.setItem("searchedCityNames", JSON.stringify(arrayOfCityNames));
        };

        // The list of generated cities by user
        var userInput = $("<li>", {
            class: "list-group-item",
            click: function () {


                //when you console.log it shows when it's clicked, which city is being clicked
                // console.log($(this));
                //this passes this element in this argument
                displayWeatherInfo(event, this);

            }

        })
        // Adding style to city
        userInput.addClass("newCity");
        userInput.attr("data-name", city);
        userInput.text(city)
        // Change to prepend when ready
        $("#cityList").prepend(userInput);
    });
    // displays weather info in jumbotron and pulls from the API
    function displayWeatherInfo(event, element) {
        clearCityJumbotron();
        clearCityCards(1,2,3,4,5);
       
        // My own generated Api key 
        var APIKey = "f7260b0580dc94670030951a250ac329";
        var city = $(element).text();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
           
            //Displays the city name in Jumbotron
            $(".currentCityName").append(response.name);
            //Displays the Icon
            var cityIconCode = response.weather[0].icon;
            var cityIconUrl = "https://openweathermap.org/img/w/" + cityIconCode + ".png";
            $("#cityIconUrl").attr("src", cityIconUrl);
            // Displays the Temp
            $("#cityTemp").append("Temperature: " + response.main.temp + " °F");
            // Displays the Speed
            $("#cityWindSpeed").append("Wind Speed: " + response.wind.speed + " mph");
            // Displays the Humidity
            $("#cityHumidity").append("Humidity: " + response.main.humidity + " %");

            //displays uv index, which is not a response from the first, after making 2nd api call
            var cityLon = response.coord.lon
            var cityLat = response.coord.lat
            var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response2) {

                // gives us the uv index numbers to the only item with a color background
                $("#cityUvIndex").append("UV Index: ").append($("#cityUvIndexNumbers").append(response2.value));

                var cityUvIndex = parseInt(parseFloat(response2.value));
                //Setups up our colors
                if (cityUvIndex < 3) {
                    $("#cityUvIndexNumbers").addClass("green");
                } else if (cityUvIndex < 7) {
                    $("#cityUvIndexNumbers").addClass("orange");
                } else {
                    $("#cityUvIndexNumbers").addClass("red");
                };
            });
            // 3rd api call to display multiple weather forecasts
            var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response3) {
                console.log(response3);
                
                //Card one 
                $("#cityDayDate1").append(response3.list[0].dt_txt.split(" ")[0]);
                $("#cityDayTemp1").append("Temp: " + response3.list[0].main.temp + "°F");
                $("#cityDayHumd1").append("Humidity: " + response3.list[0].main.humidity + "%");
                var cityIconOne = response3.list[0].weather[0].icon;
                var cityIconOneUrl = "https://openweathermap.org/img/w/" + cityIconOne + ".png";
                $("#cityDayIcon1").attr("src", cityIconOneUrl);

                //Card two
                $("#cityDayDate2").append(response3.list[8].dt_txt.split(" ")[0]);
                $("#cityDayTemp2").append("Temp: " + response3.list[8].main.temp + "°F");
                $("#cityDayHumd2").append("Humidity: " + response3.list[8].main.humidity + "%");
                var cityIconTwo = response3.list[8].weather[0].icon;
                var cityIconTwoUrl = "https://openweathermap.org/img/w/" + cityIconTwo + ".png";
                $("#cityDayIcon2").attr("src", cityIconTwoUrl);

                //Card three
                $("#cityDayDate3").append(response3.list[16].dt_txt.split(" ")[0]);
                $("#cityDayTemp3").append("Temp: " + response3.list[16].main.temp + "°F");
                $("#cityDayHumd3").append("Humidity: " + response3.list[16].main.humidity + "%");
                var cityIconThree = response3.list[16].weather[0].icon;
                var cityIconThreeUrl = "https://openweathermap.org/img/w/" + cityIconThree + ".png";
                $("#cityDayIcon3").attr("src", cityIconThreeUrl);

                //Card four
                $("#cityDayDate4").append(response3.list[24].dt_txt.split(" ")[0]);
                $("#cityDayTemp4").append("Temp: " + response3.list[24].main.temp + "°F");
                $("#cityDayHumd4").append("Humidity: " + response3.list[24].main.humidity + "%");
                var cityIconFour = response3.list[24].weather[0].icon;
                var cityIconFourUrl = "https://openweathermap.org/img/w/" + cityIconFour + ".png";
                $("#cityDayIcon4").attr("src", cityIconFourUrl);

                //Card five
                $("#cityDayDate5").append(response3.list[32].dt_txt.split(" ")[0]);
                $("#cityDayTemp5").append("Temp: " + response3.list[32].main.temp + "°F");
                $("#cityDayHumd5").append("Humidity: " + response3.list[32].main.humidity + "%");
                var cityIconFive = response3.list[32].weather[0].icon;
                var cityIconFiveUrl = "https://openweathermap.org/img/w/" + cityIconFive + ".png";
                $("#cityDayIcon5").attr("src", cityIconFiveUrl);
            });
        })
        //Using .empty or detach was not working so here is a work around
        function clearCityJumbotron() {
            // need to create variables for the img and span since they are embedded
            var img = "<img id='cityIconUrl'>";
            var span = "<span id='cityUvIndexNumbers' class='badge badge-secondary'></span>"
            //telling the function what to clear
            $(".currentCityName").text("").html(img);
            $("#cityIconUrl").attr("src", "");
            $("#cityTemp").text("");
            $("#cityHumidity").text("");
            $("#cityWindSpeed").text("");
            $("#cityUvIndexNumbers").text("");
            $("#cityUvIndex").text("").html(span);
        }
        // We are spreading the argument across many different elements i.e spread operator
        function clearCityCards(...cards) {
            console.log(cards);
            for (var i = 0; i < cards.length; i++) {
                console.log(i);
                // clearing each element
                $("#cityDayDate" + (i + 1)).text("");
                $("#cityDayTemp" + (i + 1)).text("");
                $("#cityDayHumd" + (i + 1)).text("");
                $("#cityDayIcon" + (i + 1)).attr("src", "")
            }
        }

    }






});