
var getNewcases = function(city, province) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',
			'X-RapidAPI-Key': 'b918097135mshdc36729f1885e99p1e2814jsn2952cd521a15'
		}
	};
	fetch('https://covid-19-statistics.p.rapidapi.com/reports?city_name=Autauga&region_province=Alabama&iso=USA&region_name=US&q=US%20Alabama&date=2022-05-12', options)
	.then(function(response) {
		// request was successful
		if (response.ok) {
		  response.json().then(function(data) {
			var newCases = data.data[0].confirmed_diff;
			console.log(newCases);

		  });
		} else {
		  alert("Error: " + response.statusText);
		}
	  });
	};
  
	var getPollen = function(city) {
		fetch("https://api.ambeedata.com/latest/pollen/by-place?place=Charlotte", {
	"method": "GET",
	"headers": {
		"x-api-key": "0040ab3d6bc0a15df3ee65425992bc72c7d5b5b600f7f804956943e58ad7e35f",
		"Content-type": "application/json"
	}
})
.then(function(response) {
	  // request was successful
	  if (response.ok) {
        response.json().then(function(data) {
		  var riskGrass = data.data[0].Risk.grass_pollen;
		  console.log(riskGrass);
		  var riskTree = data.data[0].Risk.tree_pollen;
		  console.log(riskTree);
		  var riskWeed = data.data[0].Risk.weed_pollen;
		  console.log(riskWeed);

		});
	  } else {
		alert("Error: " + response.statusText);
	  }
	});
};

getNewcases();
getPollen();