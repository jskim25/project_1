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

// when the user selects a city...
$(document).on('change', '#cityName', function() {
    // get value of city name input from user
    cityName = $('#cityName').val();

    // show the map for the city selected
    displayMap(cityName);
    
    // run the function that gets the events to load for that particular city
    getEvents();

    // run the weather API
    weather();

});

function getEvents() {
    // eventful API credentials
    var oArgs = {
        app_key: "5rkz73R4DCcvJcbn",
        where: cityName,
        page_size: 10,
        sort_order: "popularity",
    };

    // eventful API call
    EVDB.API.call("/events/search", oArgs, function (oData) {
        console.log(oData);

        // empty the table body of 'event table' first
        $("#event-table").find('tbody').empty();

        for (i=0; i<oData.events.event.length; i++) {
            // grab all the elements that we want to put onto table
            var event = oData.events.event[i].title;
            var startTime = oData.events.event[i].start_time;
            var venue = oData.events.event[i].venue_name;
            var address = oData.events.event[i].venue_address;
            // var city = oData.events.event[i].city_name;
            // var state = oData.events.event[i].region_abbr;

            // append those items to the table
            $("#event-table > tbody").append("<tr><td>" + event + "</td><td>" + startTime + "</td><td>" + venue + "</td><td>" + address + "</td><td>" + "<button class='add-button'>Add</button>" + "</td></tr>");
        };
    })

    // when the add button is clicked...
    $("body").on("click", ".add-button", function() {

        // prevent auto-refresh
        event.preventDefault();

        // find the table row associated with the add button
        var $row = $(this).closest("tr");

        // remove all table data no longer needed (only want event name and date/time)

        $row.find("td:last").remove();
        var t1 = $row.find(':nth-child(1)').text();
        var t2 = $row.find(':nth-child(2)').text();
        // console.log(t1);
        // console.log(t2);

        // put these into an object
        var eventData = {
            event: t1,
            date: t2,
        };

        // and push into firebase database
        database.ref().push(eventData);
    })
}

// function delete() {
//     var row = document.getElementById("project-1-5c6e9");
//     firebase.database().ref().child('users/' + user_id).remove();


//     reload_page();

//    }

// when the delete button is clicked...
$(document.body).on("click", ".delete-btn", function() {
    $(this).closest("tr").remove();

    var newRow = $(this).closest('tr');
    console.log(newRow[0]);
    var event = $($(newRow).children()[0]).text();
    var date = $($(newRow).children()[1]).text();
    
    // There are better ways to do this.
    // Iterate through the entire database until we find
    // an event and date that matches.  Then delete it.
    ref.once("value", function(snapshot) {
        // store data object in a variable
        var dataObj = snapshot.val();
        // loop through objects to get data in firebase
        for(let key in dataObj){
            if ((dataObj[key].event == event) && (dataObj[key].date == date)) {
                console.log(`Found ${event} ${date} in database`);
                firebase.database().ref(key).remove();
                break;
            }
        }
        
    
    // If any errors are experienced, log them to console.
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

// create firebase event
var ref = database.ref();

ref.on("value", function(snapshot) {

    // store data object in a variable
    var dataObj = snapshot.val();

    // empty the favorites table
    $("#favorites-table").find('tbody').empty();

    // loop through objects to get data in firebase
    for(let key in dataObj){

        // make sure this is getting the correct data
        console.log("event is: ", dataObj[key].event)
        console.log("date is: ", dataObj[key].date)

        // append to the page
        $("#favorites-table > tbody").append("<tr><td>" + dataObj[key].event + "</td><td>" + dataObj[key].date + "</td><td>" + "<button class='delete-btn'>✓</button>" + "</td></tr>")
    }
    

// If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});


