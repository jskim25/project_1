$(document).on('click', '#submitBtn', function() {
    // get value of city name input from user
    cityName = $('#cityName').val();

    // Show the map for the city
    displayMap(cityName);
    // run the function that gets the events to load
    getEvents();

    // run the function that gets the lat-long coordinates
    getCoordinates()

   
});

function initMap() {
    // map options
    var options = {
        zoom: 8,
        center: {lat: 41.8781, lng: -87.6298}
    }
    
    // new map centers to the coordinates listed in var options
    var map = new google.maps.Map(document.getElementById('map'), options);

    // adds marker on the position specified below
    // var marker = new google.maps.Marker({
    //     position: {lat: lat, lng: lng},
    //     map: map,
    // })

    // var infoWindow = new google.maps.InfoWindow({
    //     content: "<h1>Chicago IL</h1>"
    // })

    // marker.addListener("click", function() {
    //     infoWindow.open(map, marker);
    // })
}

function getCoordinates() {

    $.ajax({
        url: 'https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php',
        method: 'GET',
        type: 'json',
        crossDomain: true,
        headers: {
            'X-Mashape-Key': 'cmmPLJwYt7mshE6N1VSViGduRp4cp1DKGYZjsnLENenEatXvK1',
        },
        data: {
            location: cityName
        }
    })
    console.log(Results);
};

function getEvents() {
    var oArgs = {
        app_key: "5rkz73R4DCcvJcbn",
        where: cityName,
        page_size: 10,
        sort_order: "popularity",
    };

    EVDB.API.call("/events/search", oArgs, function (oData) {
        console.log(oData);

        for (i=0; i<oData.events.event.length; i++) {

            // all the elements needed for event table
            var event = oData.events.event[i].title;
            var startTime = oData.events.event[i].start_time;
            var venue = oData.events.event[i].venue_name;
            var address = oData.events.event[i].venue_address;
            var city = oData.events.event[i].city_name;
            var state = oData.events.event[i].region_abbr;

            // append to table
            $("#event-table > tbody").append("<tr><td>" + event + "</td><td>" + startTime + "</td><td>" + venue + "</td><td>" + address + "</td><td>" + city + "</td><td>" + state + "</td><td>" + "<button class='add-button'>Add</button>" + "</td></tr>");
        };
    })

    $("body").on("click", ".add-button", function() {
        var newRow = $(this).closest("tr");
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        // create new button element, append to newRow button element
        $("#todo-table").append(newRow);
       
    })
    
}

// $(document).ready(function () {
//             //?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
//             // &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
//             // &markers=color:red%7Clabel:C%7C40.718217,-73.998284
//             // &key=AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE

//     var mapData = {
//         zoom: 13,
//         size: '600x150',
//         maptype: 'roadmap',
//         key: 'AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE',
//         center: ''
//     }

//     function makeUrl(mapData) {
//         var url = 'https://maps.googleapis.com/maps/api/staticmap?';
//         return url + '?' + $.param(mapData)
//     }
//     var debug = true;
//     function dlog(m) {
//         if (debug) {
//             console.log(m)
//         }
//     }

//     //We are only querying the events API for events within the next 365 days.        
//     var fromTime = new Date(Date.now());
//     var toTime   = new Date(Date.now() + 365*86400*1000);
    
//     fromTime = fromTime.toJSON();
//     toTime = toTime.toJSON();
//     // Events API doesn't like the fractional seconds.  .875 in the example below.
//     // 2018-07-03T15:37:15.875Z
//     // fromTime.trimRight('Z');
//     // toTime.trimRight('Z');
//     fromTime=fromTime.slice(0, 19) + 'Z';
//     toTime=toTime.slice(0, 19) + 'Z';
    
//     dlog(`start time: ${fromTime}`);
//     dlog(`end   time: ${toTime}`);

//     var cityName = '';
//     var lat = '';
//     var lon = '';
//     var ll  = '';
//     var addresses = [];

//         if ($('#cityName').val() != "") {
//             cityName=$('#cityName').val();
//         }
//         dlog(`City is now ${cityName}`);        
//         e.preventDefault();
//         // Do nothing if they haven't selected a city.
//         // TODO smack user for doing that.
//         if (cityName == '') { return; }
//         dlog('event: ' + e);

//         //Get the lat/long of the city and state.
//         ////////////////////////////////////////////////
//         ////////////////////////////////////////////////
//         //  LAT/LONG
//         ////////////////////////////////////////////////
//         ////////////////////////////////////////////////
//         $.ajax({
//             url: 'https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php',
//             method: 'GET',
//             type: 'json',
//             crossDomain: true,
//             headers: {
//                 'X-Mashape-Key': 'cmmPLJwYt7mshE6N1VSViGduRp4cp1DKGYZjsnLENenEatXvK1',
//             },
//             data: {
//                 location: cityName
//             }

//         })
//         .done(function(result) {
//             ////////////////////////////////////////////////
//             ////////////////////////////////////////////////
//             ///  STATIC MAP
//             ////////////////////////////////////////////////
//             ////////////////////////////////////////////////
//             dlog(`will draw static map next`);
//             var U = makeUrl(mapData);
//             var newImg = $('<img>');
//             $(newImg).attr('src',U);

//             dlog(`newURL: ${U}`)

//             $('#sub-right').empty();
//             $('#sub-right').append(newImg);
            
//         })
//         .done(function(result) {
//             ////////////////////////////////////////////////
//             ////////////////////////////////////////////////
//             ///  EVENT QUERY
//             ////////////////////////////////////////////////
//             ////////////////////////////////////////////////

//             // dlog(result)
//             dlog('Starting events query');
//             lat = result.Results[0].lat;
//             lon = result.Results[0].lon;
//             ll  = result.Results[0].ll;
//             dlog(`LAT/LON: ${lat} ${lon} ${ll}`);
//             //Get the events happening in that city within the next 6 months.
//             $.ajax({
//                 url: 'https://robby.p.mashape.com/search.json',
//                 method: 'GET',
//                 type: 'json',
//                 crossDomain: true,
//                 headers: {
//                     'X-Mashape-Key': 'cmmPLJwYt7mshE6N1VSViGduRp4cp1DKGYZjsnLENenEatXvK1',
//                 },
//                 data: {
//                     lat:    lat,
//                     lng:    lon,
//                     from: fromTime,
//                     to: toTime,
//                     distance: 25,
//                     limit:  10
//                 }
//             })
//             .done(function(result) {
//                 dlog(`Events Result: ${result}`)
//                 result.result.forEach(element => {
//                     // dlog(`${element.title} ${element.address}`);
//                     if (element.address != '') {
//                         dlog(`Event --> ${element.title} ${element.address}`);
//                         var newDiv = $('<div>');
//                         $(newDiv).append($('<p>').text(element.title).addClass('eventLnk'));
//                         $('#sub-left').empty();
//                         $('#sub-left').append(newDiv);
//                     }
//                 });
//             })
//         })
//     })
// })
