// Get jquery objects from DOM
var pageheader = $("#page-header");
var pagecontainer = $("#page-container");
var getWeatherBtn = $("#get-weather");
var geolocSuccess = false;

getWeatherBtn.on("click", function () {
    if ($("#place-query").val() === "") {
        alertify.alert("Please enter a location!");
    } else if (!geolocSuccess) {
        alertify.alert("The weather for your location is not available. Try something else?")
    } else {
        getWeather();
    }
});

$("#place-data").hide();

$("#place-query").geocomplete({ details: "#place-data" }).bind("geocode:result", function (event, result) {
    geolocSuccess = true;
});

function getWeather() {
    var url = "http://api.openweathermap.org/data/2.5/weather?";
    url = url + "lat=" + $("#latitude").text();
    url = url + "&";
    url = url + "lon=" + $("#longitude").text();
    url = url + "&units=metric&APPID=4dce0ac8bf53858e36f243d5ba23a49d";
    var imgUrl;
    $.getJSON(url, function (result, status) {
        if (status != "success") {
            alertify.alert("The weather for your location is not available. Try something else?")
        }
        else {
            $("#weather").text(result.weather[0].description);
            $("#minTemp").text(result.main.temp_min);
            $("#maxTemp").text(result.main.temp_max);
            imgUrl = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
            $("#weatherImg").attr("src", imgUrl);
        }
    });
}

function locationChange() {
    geolocSuccess = false;
}