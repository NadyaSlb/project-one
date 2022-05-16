

var cityInput = document.querySelector('#cityInput');
var provinceInput = document.querySelector('#provinceInput');
var button = document.querySelector('#button');
var key = "827872d8b7d2aff6bb0c70ca4245ef14";

var formSearchHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    var city = cityInput.value.trim();
	var province = provinceInput.value.trim();
    console.log(city);
	console.log(province);
	getNewcases(province);
	getCoordinates(city);
    if (city, province) {
	
      // clear old content
     cityInput.value = "";
    } else {
      alert("Please enter a city");
    }
  };

var getNewcases = function(province) {
	
	fetch("https://corona.lmao.ninja/v2/states/" + province + "?yesterday=")
	.then(function(response) {
		// request was successful
		if (response.ok) {
		  response.json().then(function(data) {
		
			console.log(data);
			var activeCases = data.active;
			console.log(activeCases);

		  });
		} else {
		  alert("Error: " + response.statusText);
		}
	})
	.catch(function(error) {
	  alert("Unable to connect to server");
	  });
	};

var getCoordinates = function(city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key;
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
              var cityLat = data[0].lat;
              var cityLon = data[0].lon;
              console.log(cityLat);
              console.log(cityLon);
              getPollution(cityLat, cityLon);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });
  };

  var getPollution = function(cityLat, cityLon) {
		fetch("https://api.openweathermap.org/data/2.5/air_pollution?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + key)
.then(function(response) {
	  // request was successful
	  if (response.ok) {
        response.json().then(function(data) {
		 console.log(data);
		 var airQualityIndex = data.list[0].main.aqi;
		 console.log(airQualityIndex);
		});
	  } else {
		alert("Error: " + response.statusText);
	  }
	})
	.catch(function(error) {
	  alert("Unable to connect to OpenWeather");
	});
};

button.addEventListener("click", formSearchHandler);