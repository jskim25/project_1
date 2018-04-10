// function weather(temp){
var city = ("Chicago");
// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}

var queryURL = `http://api.openweathermap.org/data/2.5/forecast/?q=${city},US&cnt=50&APPID=f1c343a7fa1590950b890cfa335fc1c8&mode=json&units=imperial`
queryURL = encodeURI(queryURL);
console.log(queryURL);
        $.ajax({
        url: queryURL,
        method: "GET",
        type: 'json',
       
        }).then(function(response) {
        var results = response;
        console.log(results);
  
//var arrLength = newArr.length;
var newArr = [];


response.list.slice(0,40).forEach(element => {
// console.log(element.main.temp);

   var weather = element.main.temp;
   var string = JSON.stringify(weather);
  // console.log(string);
   var newString = string.slice(0,2);
   //console.log(newString);

   newArr.push(newString);

   for (var i = 0; i < newArr.length; i++){
     console.log(newArr[i]);
  
   }

//   console.log(newArr);

   var pOne = $("<p>").text(newString);
   $("#weather").append(pOne);
  
});

// // var ex = response.list[0].dt;
// // console.log(ex);
// var newarr = [];

// response.list.slice(0,10).forEach(element => {
  
//   var el = element.dt;
//   var string = JSON.stringify(el);
//   var newString = string.slice(0,10);
//   //var n = ;

// for (var i = 0; i < response.list.length; i++)
//   newarr.push(newString[i]);
//   console.log(newarr);

//   newString = moment().format('MMMM Do YYYY');
//   //console.log(newString);
//   var str = newString;

// });

        });

   
//for every element in array if time is 9:00 then add to new array