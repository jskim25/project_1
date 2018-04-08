$(document).ready(function(){
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    ////   Initialize firebase
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    var config = {
        apiKey: "AIzaSyB2H-wik-3ypKe_8vIQG8kNIlBdDDPtRX4",
        authDomain: "nucbc-project1-1522799622407.firebaseapp.com",
        databaseURL: "https://nucbc-project1-1522799622407.firebaseio.com",
        projectId: "nucbc-project1-1522799622407",
        storageBucket: "nucbc-project1-1522799622407.appspot.com",
        messagingSenderId: "350036869082"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var ref = firebase.database().ref('/');

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    ////   Populate the city selector dropdown with citynames from firebase
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    var cityNames = firebase.database().ref().child('cityNames');
    cityNames.on('value', function(snapshot) {
        snapshot.val().forEach(element => {
            $('#cityName').append($('<option>').text(element));
        });
    });
    


    $(document).on('change', '#cityName', function() {
        // get value of city name input from user
        cityName = $('#cityName').val();

        // Show the map for the city
        displayMap(cityName);
        
        // run the function that gets the events to load
        getEvents();

        
    });


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

                // var lat = oData.events.event[i].latitude;
                // var lng = oData.events.event[i].longitude;

                // append to table
                $("#event-table > tbody").empty();
                $("#event-table > tbody").append("<tr><td>" + event + "</td><td>" + startTime + "</td><td>" + venue + "</td><td>" + address + "</td><td>" + city + "</td><td>" + state + "</td></tr>");
            };
        })
        
    }

})

