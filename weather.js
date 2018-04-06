function weather(temp){
var lat = result.Results[0].lat;
var lon = result.Results[0].log;
var ll = result.Results[0].ll;
var queryURL = "https://simple-weather.p.mashape.com/weather?lat=" + lat + "&lng=' + lon + '";

        $.ajax({
        url: queryURL,
        method: "GET",
        type: 'json',
        Accept: 'text/plain',
        headers: {
        "X-Mashape-Key": "eJHqmHEropmshFKDVlw7OsJtqDyDp1xox4ijsnSq6RVyJwh0EU"
        }
        }).then(function(response) {
        
        var results = response;

        console.log(results);
        var strJson = JSON.stringify(results);
//strJson.replace(/^at Chicago, United States+/i, ''); 
          var newStr = results.slice(0,2);
        console.log(strJson);
          console.log(newStr);



       // for (var i = 0; i < results.length; i++) {

            var pOne = $("<p>").text(newStr);

            $("#weather").append(pOne);


        });

      };