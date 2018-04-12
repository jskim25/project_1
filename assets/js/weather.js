function weather(){
    var city = $("#cityName").val();
        
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast/?q=${city},US&cnt=1&APPID=f1c343a7fa1590950b890cfa335fc1c8&mode=json&units=imperial`
        queryURL = encodeURI(queryURL);
        console.log(queryURL);
            $.ajax({
            url: queryURL,
            method: "GET",
            type: 'json',
            
            }).then(function(response) {
            var results = response;
            console.log(results);
          
        $("#weather").empty();
    
        response.list.slice(0,1).forEach(element => {
        
           var weather = element.main.temp;
           var string = JSON.stringify(weather);
           var newString = string.slice(0,2);
    
        
           var pOne = $("<p>").text(newString);
           $("#weather").append(pOne);
          
        });
        
        // var ex = response.list[0].dt;
        // console.log(ex);
        var newarr = [];
        
        response.list.slice(0,10).forEach(element => {
          
          var el = element.dt;
          var string = JSON.stringify(el);
          var newString = string.slice(0,10);
          //var n = ;
        
        for (var i = 0; i < response.list.length; i++)
          newarr.push(newString[i]);
          console.log(newarr);
        
          newString = moment().format('MMMM Do YYYY');
          //console.log(newString);
          var str = newString;
        
          var pOne = $("<p>").text(newString);
          $("#weather").prepend(pOne);
        });
        
    });
  
};