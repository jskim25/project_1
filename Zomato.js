

var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id=292&count=10"

// "https://developers.zomato.com/api/v2.1/collections?city_id=292&count=10"


        $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "user-key": "ad7fabfce39df4adc394aba2dd8c12c8"
        }
        }).then(function(response) {
        
        var results = response.restaurants;

        console.log(results);

       // for (var i = 0; i < results.length; i++) {

            var collectDiv = $("<div class='item'>");

        //    var title = response.title;

        //    console.log(title);

            var pOne = $("<p>").text("Title" + title);

            collectDiv.append(pOne);

       // }


        });