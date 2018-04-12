

$(document).ready(function(){

    // Global Variables
    
    var debug = true;
    
    //  Array to hold the results of the current events DB query.
    var currentEvents = [];

    var mapData = {
        zoom: 13,
        size: '600x150',
        maptype: 'roadmap',
        key: 'AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE',
        center: ''
    }

    // Turn logging on or off by using this and setting 'debug'.
    function dlog(m) {
        if (debug) {
            console.log(m)
        }
    }
    
    //Parameterize the 'mapData' JSON objects, and add it to the maps URL.
    function makeUrl(mapData) {
        var url = 'https://maps.googleapis.com/maps/api/staticmap?';
        return url + '?' + $.param(mapData)
    }
    
    // Display static Google map based on a location string.  i.e. "myCity, myState"
    function displayMap(strWhere) {
        dlog(`displayMap called with cityName ${strWhere}`)
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ///  STATIC MAP
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        dlog(`will draw static map next`);
        mapData.center=strWhere;
        dlog(mapData);
        var U = makeUrl(mapData);
        var newImg = $('<img>');
        $(newImg).attr('src',U);
    
        dlog(`newURL: ${U}`)
    
        $('#map').empty();
        $('#map').append(newImg);
    }    
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    ////   Event handler for clicks on a table row
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    //
    // Table rows don't exist until user queries events API.
    // So we bind this function to the rows before they exists.
    // The uniqueness of the selector is its 'data-evtnum' attribute.
    /////////////////////////////////////////////////////////////////////////////////////////
    $('table').on('click', '[data-evtnum]', function(event) {

        //  This is necessary to prevent the event from bubbling up from the TD
        //  to the TR to the TABLE, resulting in the event firing twice (TD+TR) for each click.
        event.stopPropagation();
        var eventNumber = $(this).data('evtnum');
        dlog(`Table row ${eventNumber} just got clicked`);
        
        dlog(`Will now update the map for location ${currentEvents[eventNumber].city_name}, ${currentEvents[eventNumber].region_abbr}`)
    })


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
    var ref = database.ref('/');

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    ////   Populate the city selector dropdown with citynames from firebase
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    var cityNames = ref.child('cityNames');
    cityNames.on('value', function(snapshot) {
        snapshot.val().forEach(element => {
            $('#cityName').append($('<option>').text(element));
        });
    });
    

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    ////   User changes the city dropdown.
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////

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
            dlog(oData);
            // Put the events array in to our global variable.
            currentEvents = oData.events.event;
            // Clear any previous events from the event table.
            $("#event-table > tbody").empty();
            for (i=0; i<currentEvents.length; i++) {

                // all the elements needed for event table
                var event = currentEvents[i].title;
                var startTime = currentEvents[i].start_time;
                var venue = currentEvents[i].venue_name;
                var address = currentEvents[i].venue_address;
                var city = currentEvents[i].city_name;
                var state = currentEvents[i].region_abbr;

                // var lat = currentEvents[i].latitude;
                // var lng = currentEvents[i].longitude;


                
                // The row element, and every td element in the row will get an attribute
                // 'data-evtnum' with a value equal to the index of the event in the events array.
                // So when any column is clicked, we know the row.
                var tRow = $(`<tr data-evtnum=${i}>`);

                $(tRow).append($(`<td data-evtnum=${i}>`).text(event));
                $(tRow).append($(`<td data-evtnum=${i}>`).text(startTime));
                $(tRow).append($(`<td data-evtnum=${i}>`).text(venue));
                $(tRow).append($(`<td data-evtnum=${i}>`).text(address));
                $(tRow).append($(`<td data-evtnum=${i}>`).text(city));
                $(tRow).append($(`<td data-evtnum=${i}>`).text(state));
                

                // append row to table
                $("#event-table > tbody").append(tRow);
            };
        })
        
    }

})

