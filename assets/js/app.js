$(document).on('click', '#submitBtn', function() {
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


