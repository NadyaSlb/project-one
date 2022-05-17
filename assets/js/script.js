
var cityInput = document.querySelector('#cityInput');
var provinceInput = document.querySelector('#provinceInput');
var button = document.querySelector('#button');
var key = "827872d8b7d2aff6bb0c70ca4245ef14";
//var optionAl = document.querySelector('#AL');
var stateId = "";
var locationsList = document.querySelector('#locationsList');
var savedCity = "";
var savedProvince = "";



var formSearchHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    var city = cityInput.value.trim();
	var province = provinceInput.value.trim();
    console.log(city);
	console.log(province);
	getNewcases(province);
	getstateId(province);
	getCoordinates(city);
	SaveLocation(city, province);
	clearList();
	displayLocations();
	//var stateId = optionAl.getAttribute("id");
//console.log(stateId);
//getstateId(province, stateId);
    if (city, province) {
      // clear old content
     cityInput.value = "";
	 provinceInput.value = "";
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
			var todaysCases = data.todayCases;
			console.log(activeCases);
			console.log(todaysCases);
			if (activeCases < 5000) {
				document.querySelector("#response").innerHTML =
				  "Active cases are less than 5,000 for state " + province + " . No mask required.";
			  } else if (activeCases > 5000) {
				document.querySelector("#response").innerHTML =
				  "Active cases are more than 5,000 for state " + province + " . Wearing a mask is recommended.";
			  }
			  document.querySelector("#Cases").innerHTML =
				"Current active cases for " + province + ": " + activeCases;
			  document.querySelector("#todays-cases").innerHTML =
				"New cases reported today for " + province + ": " + todaysCases;
			  if (todaysCases == 0) {
				document.querySelector("#todays-cases").innerHTML =
				  "New cases reported today for " +
				  province +
				  ": " +
				  todaysCases +
				  ". " +
				  "New cases update at various times throughout the day for each state. This might reflect as '0' until states have updated cases.";
			  }
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
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + stateId + ",USA&limit=1&appid=" + key;
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
		  //console.log(data);
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
		 if (airQualityIndex == 1){
			document.querySelector("#air-1").innerHTML =
			"Air quality is good. Wearing a mask is not recommended.";
		 }
		 else if (airQualityIndex == 2){
			document.querySelector("#air-1").innerHTML =
			"Air quality is fair. Wearing a mask is not recommended.";
		 }
		 else if (airQualityIndex == 3){
			document.querySelector("#air-1").innerHTML =
			"Air quality is moderate. Wearing a mask is recommended for sensitive groups of people.";
		 }
		 else if (airQualityIndex == 4){
			document.querySelector("#air-1").innerHTML =
			"Air quality is poor. Wearing a mask is recommended.";
		 }
		 else if (airQualityIndex == 5){
			document.querySelector("#air-1").innerHTML =
			"Air quality is very poor. Wearing a mask is strongly recommended.";
		 }
		});
	  } else {
		alert("Error: " + response.statusText);
	  }
	})
	.catch(function(error) {
	  alert("Unable to connect to OpenWeather");
	});
};

var getstateId = function(province){
	if (province == "Alabama"){
		stateId ="Al";
	}else if (province == "Alaska"){
		stateId = "AK";
	}else if (province == "Arizona"){
		stateId = "AZ";
	}else if (province == "Arkansas"){
		stateId = "AR";
	}else if (province == "California"){
		stateId = "CA";
	}else if (province == "Colorado"){
		stateId = "CO";
	}else if (province == "Connecticut"){
	    stateId = "CT";
	}else if (province == "Delaware"){
	    stateId = "DE";
	}else if (province == "Florida"){
	    stateId = "FL";
	}else if (province == "Georgia"){
	    stateId = "GA";
	}else if (province == "Hawaii"){
	    stateId = "HI";
	}else if (province == "Idaho"){
	    stateId = "ID";
	}else if (province == "Illinois"){
	    stateId = "IL";
	}else if (province == "Indiana"){
	    stateId = "IN";
	}else if (province == "Iowa"){
	    stateId = "IA";
	}else if (province == "Kansas"){
	    stateId = "KS";
	}else if (province == "Kentucky"){
	    stateId = "KY";
	}else if (province == "Louisiana"){
	    stateId = "LA";
	}else if (province == "Maine"){
	    stateId = "ME";
	}else if (province == "Maryland"){
	    stateId = "MD";
	}else if (province == "Massachusetts"){
	    stateId = "MA";
	}else if (province == "Michigan"){
	    stateId = "MI";
	}else if (province == "Minnesota"){
	    stateId = "MN";
	}else if (province == "Mississippi"){
	    stateId = "MS";
	}else if (province == "Missouri"){
	    stateId = "MO";
	}else if (province == "Montana"){
	    stateId = "MT";
	}else if (province == "Nebraska"){
	    stateId = "NE";
	}else if (province == "Nevada"){
	    stateId = "NV";
	}else if (province == "New Hamshire"){
	    stateId = "NH";
	}else if (province == "New Jersey"){
	    stateId = "NJ";
	}else if (province == "New Mexico"){
	    stateId = "NM";
	}else if (province == "New York"){
	    stateId = "NY";
	}else if (province == "North Carolina"){
	    stateId = "NC";
	}else if (province == "North Dakota"){
	    stateId = "ND";
	}else if (province == "Ohio"){
	    stateId = "OH";
	}else if (province == "Oklahoma"){
	    stateId = "OK";
	}else if (province == "Oregon"){
	    stateId = "OR";
	}else if (province == "Pennsylvania"){
	    stateId = "PA";
	}else if (province == "Rhode Island"){
	    stateId = "RI";
	}else if (province == "South Carolina"){
	    stateId = "SC";
	}else if (province == "South Dakota"){
	    stateId = "SD";
	}else if (province == "Tennessee"){
	    stateId = "TN";
	}else if (province == "Texas"){
	    stateId = "TX";
	}else if (province == "Utah"){
	    stateId = "UT";
	}else if (province == "Vermont"){
	    stateId = "VT";
	}else if (province == "Virginia"){
	    stateId = "VA";
	}else if (province == "Washington"){
	    stateId = "WA";
	}else if (province == "West Virginia"){
	    stateId = "WV";
	}else if (province == "Wisconsin"){
	    stateId = "WI";
	}else if (province == "Wyoming"){
	    stateId = "WY";
	}
	console.log(stateId);
}

// save cities to local storage
var SaveLocation = function(city, province){
    newLocations = JSON.parse(localStorage.getItem("locations"));
	if (!newLocations) {
		newLocations = {
		  cities: [],
		  provinces: [],
		};
	};
    newLocations.cities.push(city);
	newLocations.provinces.push(province);
    console.log(newLocations);
    localStorage.setItem("locations", JSON.stringify(newLocations));
  }

// list of saved cities
var displayLocations = function(savedCity, savedProvince){
	var locations = {cities:[], provinces:[]};
	locations = JSON.parse(localStorage.getItem("locations"));
	if (!locations) {
		locations = {
		  cities: [],
		  provinces: [],
		};
	};
	console.log(locations);
	console.log(locations.cities[0]);
	for (var i = 0; i < locations.cities.length; i++) {
	  savedCity = locations.cities[i];
	  savedProvince = locations.provinces[i];
	  var locationE1 = document.createElement("li");
	  locationsList.appendChild(locationE1);
	  locationE1.textContent = savedCity + " , " + savedProvince;
	}
  }

// clear previous search history
var clearList = function(){
	locationsList.innerHTML = "";
  }

displayLocations();
//modal
var searchButton = document.querySelector("#button");
var modalBg = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");
var closeButton = document.querySelector("#button2");

searchButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

button.addEventListener("click", formSearchHandler);

