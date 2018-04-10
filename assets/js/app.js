// PROJECT 1 APP JS FILE

// variable for the checklist used later
var toDoCount = 0;

// firebase credentials
var config = {
    apiKey: "AIzaSyD1M7vn5mlncIUT5WxX973pMcArUMZG2_0",
    authDomain: "project-1-5c6e9.firebaseapp.com",
    databaseURL: "https://project-1-5c6e9.firebaseio.com",
    projectId: "project-1-5c6e9",
    storageBucket: "project-1-5c6e9.appspot.com",
    messagingSenderId: "75312830432"
};

// initialize firebase
firebase.initializeApp(config);

var database = firebase.database();

$(document).on('change', '#cityName', function() {
    // get value of city name input from user
    cityName = $('#cityName').val();

    // Show the map for the city
    displayMap(cityName);
    
    // run the function that gets the events to load
    getEvents();

});

// function to get the events and append to page
function getEvents() {
    // eventful API credentials
    var oArgs = {
        app_key: "5rkz73R4DCcvJcbn",
        where: cityName,
        page_size: 10,
        sort_order: "popularity",
    };

    EVDB.API.call("/events/search", oArgs, function (oData) {
        console.log(oData);

        // empty the table body of 'event table'
        $("#event-table").find('tbody').empty();

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

    // on click function for adding to favorites
    $("body").on("click", ".add-button", function() {
        // add to database first
        // var eventData = {
        //     event = event,
        //     startTime = startTime,
        //     venue = venue,
        //     address = address,
        //     city = city,
        //     state = state,
        // };

        //database.ref().push(eventData);



        // instead of appending to dom, on value will grab data from firebase

        // create a variable to store this data

        // then append to page

        // find the table row associated with the add button
        var newRow = $(this).closest("tr");

        // var oTable = document.getElementById('table-favorites');
        // // console.log(oTable);
        // var rowLength = oTable.rows.length
        // for (i=0; i<rowLength; i++) {
        //     var oCells = oTable.rows.item(i).cells;
        //     var cellLength = oCells.length;
        //     for (var j=0; j<cellLength; j++) {
        //         var cellVal = oCells.item(j).innerHTML;
        //         // console.log(cellVal);
        //     }
        // }

        var obj = $('#table-favorites tbody tr').map(function() {
            var $row = $(this);
            var t1 = $row.find(':nth-child(1)').text();
            var t2 = $row.find(':nth-child(2)').text();
            console.log(t1);
            console.log(t2);
        })
            // return {
            //     td_1: $row.find(':nth-child(1)').text(),
            //     td_2: $row.find(':nth-child(2)').text(),
            //     td_3: $row.find(':nth-child(3)').text()
            //    };
            // }).get();

        // remove the unnecessary table data (only want event name and date/time)
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();
        newRow.find("td:last").remove();

        // append this to the page
        $("#to-do-table").append(newRow);

        // create a button
        var toDoClose = $("<button>");

        // give it an attribute and append to the table row
        toDoClose.attr("data-to-do", toDoCount);
        toDoClose.addClass("checkbox");
        toDoClose.append("✓");
        newRow = newRow.append(toDoClose);
    })

    $(document.body).on("click", ".checkbox", function() {
        $(this).closest("tr").remove();
    })
}

