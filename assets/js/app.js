$(document).ready(function () {

    var mapData = {
        url: ,
        zoom: 13,
        size: '600x150',
        maptype: 'roadmap',
        key: 'AIzaSyACZ7_uSZkB04YgT3vZ1zuLyEmmzS5ZqXs',
        center: ''
    }

    function mapUrl(mapData) {
        var url = 'https://maps.googleapis.com/maps/api/staticmap?';
        return $url + '?' + $param(mapData)
    }
    var debug = true;
    function dlog(m) {
        if (debug) {
            console.log(m)
        }
    }
    //We are only querying the events API for events within the next 365 days.        
    var fromTime = new Date(Date.now());
    var toTime   = new Date(Date.now() + 365*86400*1000);
    
    fromTime = fromTime.toJSON();
    toTime = toTime.toJSON();
    // Events API doesn't like the fractional seconds.  .875 in the example below.
    // 2018-07-03T15:37:15.875Z
    // fromTime.trimRight('Z');
    // toTime.trimRight('Z');
    fromTime=fromTime.slice(0, 19) + 'Z';
    toTime=toTime.slice(0, 19) + 'Z';
    
    dlog(`start time: ${fromTime}`);
    dlog(`end   time: ${toTime}`);

    var cityName = '';
    var lat = '';
    var lon = '';
    var ll  = '';
    var addresses = [];


    //When user clicks submit
    $('#cityName').on('change', function(e) {
        if ($('#cityName').val() != "") {
            cityName=$('#cityName').val();
        }
        dlog(`City is now ${cityName}`);        
        e.preventDefault();
        // Do nothing if they haven't selected a city.
        // TODO smack user for doing that.
        if (cityName == '') { return; }
        dlog('event: ' + e);

        //Get the lat/long of the city and state.
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
        .done(function(result) {
            dlog(`will dreaw static map next`);
            //?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
            // &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
            // &markers=color:red%7Clabel:C%7C40.718217,-73.998284
            // &key=AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE
            var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';

            mapUrl += '&zoom=13';
            mapUrl += '&size=600x150';
            mapUrl += '&maptype=roadmap';
            mapUrl += '&key=AIzaSyACZ7_uSZkB04YgT3vZ1zuLyEmmzS5ZqXs';

            mapUrl += `&center=${cityName}`

            var newImg = $('<img>');
            $(newImg).attr('src',mapUrl);

            $('#sub-right').empty();
            $('#sub-right').append(newImg);
            
        })
        .done(function(result) {
            // dlog(result)
            dlog('Starting events query');
            lat = result.Results[0].lat;
            lon = result.Results[0].lon;
            ll  = result.Results[0].ll;
            dlog(`LAT/LON: ${lat} ${lon} ${ll}`);
            //Get the events happening in that city within the next 6 months.
            $.ajax({
                url: 'https://robby.p.mashape.com/search.json',
                method: 'GET',
                type: 'json',
                crossDomain: true,
                headers: {
                    'X-Mashape-Key': 'cmmPLJwYt7mshE6N1VSViGduRp4cp1DKGYZjsnLENenEatXvK1',
                },
                data: {
                    lat:    lat,
                    lng:    lon,
                    from: fromTime,
                    to: toTime,
                    distance: 25,
                    limit:  10
                }
            })
            .done(function(result) {
                dlog(`Events Result: ${result}`)
                result.result.forEach(element => {
                    // dlog(`${element.title} ${element.address}`);
                    if (element.address != '') {
                        dlog(`Event --> ${element.title} ${element.address}`);
                        var newDiv = $('<div>');
                        $(newDiv).append($('<p>').text(element.title).class('eventLnk'));
                        $('#sub-left').empty();
                        $('#sub-left').append(newDiv);
                    }
                });
            })
        })
    })
})
    




    