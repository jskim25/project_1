function initMap() {
    // map options
    var options = {
        zoom: 8,
        center: {lat: 41.8781, lng: -87.6298}
    }
    
    // new map set to whatever is in 'options'
    var map = new google.maps.Map(document.getElementById('map'), options);
    // add marker on chicago
    var marker = new google.maps.Marker({
        position: {lat: 41.8781, lng: -87.6298},
        map: map,
    })
    var infoWindow = new google.maps.InfoWindow({
        content: "<h1>Chicago IL</h1>"
    })
    marker.addListener("click", function() {
        infoWindow.open(map, marker);
    })
}

$(document).ready(function () {
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
     // WhenEVER user changes the city dropdown, update the cityName variable to what they chose.
    $('#cityName').on('change', function(e) {
        if ($('#cityName').val() != "") {
            cityName=$('#cityName').val();
        }
        dlog(`City is now ${cityName}`);
    })


    //When user clicks submit
    $('form').on('submit', function(e) {
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
            dlog(`will call initMap next`);
            initMap(lat, lon, cityName);
        })
    })
})
    




    // Get latitude and longitude for a City, State


    // Results
    // :
    // Array(1)
    // 0
    // :
    // c
    // :
    // "US"
    // l
    // :
    // "/q/zmw:60290.1.99999"
    // lat
    // :
    // "41.959999"
    // ll
    // :
    // "41.959999 -87.879997"
    // lon
    // :
    // "-87.879997"
    // name
    // :
    // "Chicago, Illinois"
    // type
    // :
    // "city"
    // tz
    // :
    // "America/Chicago"
    // tzs
    // :
    // "CDT"
    // zmw
    // :
    // "60290.1.99999"
    // __proto__
    // :
    // Object
    // length
    // :
    // 1
    // __proto__
    // :
    // Array(0)
    // powerdBy
    // :
    // "deVru"
    // __proto__
    // :
    // Object


    //Get a list of events in a city for the next 3 months
//     curl --get --include 'https://robby.p.mashape.com/search.json?
// key=
// city=New+York
// country=US
// distance=10
// from=2016-06-30T20%3A30%3A00
// lat=40.71435
// limit=30
// lng=-74.00597
// to=2016-08-01T20%3A30%3A00%2B08%3A00' \
//   -H 'X-Mashape-Key: cmmPLJwYt7mshE6N1VSViGduRp4cp1DKGYZjsnLENenEatXvK1' \
//   -H 'Accept: application/json'



//     result : [{
//         id : '1478491',
//         title : 'Madonna Concert',
//         description : 'Yearly concert of madonna in NY',
//         date : '2013-12-23T22:30:00+08:00',
//         category : 'Concert',
//         url : 'https://www.hypecal.com/event/page/xxx',
//         ticket : 'https://www.hypecal.com/ticket/artist/xxx',
//         venue : 'Carnegie Hall',
//         city : 'New York',
//         address : '881 7th Ave',
//         zip : '10019',
//         country : 'US',
//         lat : '40.76502',
//         lng : '-73.97990',
//         image : 'https://cdn.hypecal.com/1478491_0_thumb.png'
//    },


    // $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1gbt99772tn_adn99&state=il&city=chicago&childtype=neighborhood') + '&callback=?', function(data){
	//     dlog(data.contents);
    // });

    // $.ajax({
    //     url:    "https://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1gbt99772tn_adn99&state=il&city=chicago&childtype=neighborhood",    
    //     method: 'GET',
    //     dataType: 'xml',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*'
    //     }
    // })
    // .done(function(result) {
    //     dlog(result);
    // })
// })


// Testing "whateverorigin.org" as a CORS proxy.



// var sampleResult = {  
//     "result":[  
//        {  
//           "id":"248817124",
//           "title":"Simpatico Opening Reception",
//           "description":"Relationships, like nature,\u00a0when adequately cultivated blossom into healthy new growth.\u00a0With the collaborative exhibition \u2018Simpatico,\u2019 co-curators Alix Sloan (Sloan Fine Art) and Lori Johns (Ph...",
//           "url":"https:\/\/www.robby.ai\/e\/seattle\/socializing\/phylogeny-contemporary\/simpatico-opening-reception\/248817124\/2\/",
//           "ticket":null,
//           "category":"Socializing",
//           "date":"2018-04-07T02:00:00-07:00",
//           "duration":2,
//           "venue":"Phylogeny Contemporary",
//           "address":"2718 Elliott Avenue",
//           "city":"Seattle",
//           "zip":"",
//           "country":null,
//           "lat":null,
//           "lng":null,
//           "distance":1.8185,
//           "images":[  
 
//           ],
//           "videos":[  
 
//           ],
//           "performers":[  
 
//           ]
//        },
//        {  
//           "id":"249369871",
//           "title":"Onyx Fine Arts Collective TruthBTold Commemorative Book Launch",
//           "description":"From January 8, 2017 through February 18, 2017 Onyx Fine Arts Collective mounted the largest ever exhibition of art by Pacific Northwest visual artists of African descent. Our 12th Annual Exhibit, Tr...",
//           "url":"https:\/\/www.robby.ai\/e\/seattle\/socializing\/gallery-onyx\/onyx-fine-arts-collective-truthbtold-commemorative-book-launch\/249369871\/2\/",
//           "ticket":null,
//           "category":"Socializing",
//           "date":"2018-04-07T23:00:00-07:00",
//           "duration":4,
//           "venue":"Gallery ONYX",
//           "address":"600 Pine St ",
//           "city":"Seattle",
//           "zip":"98101",
//           "country":null,
//           "lat":null,
//           "lng":null,
//           "distance":0.5342,
//           "images":[  
 
//           ],
//           "videos":[  
 
//           ],
//           "performers":[  
 
//           ]
//        },
//        {  
//           "id":"244865343",
//           "title":"Showcase @ Couth Buzzard [Roster Full]",
//           "description":"Slot 1\u00a0 Notable Journey (www.notablejourney.com) Slot 2 \u00a0Michael Ashe (www.michaelashemusic.com) Slot 3 \u00a0Tom Esch (www.tomeschmusic.com) Slot 4 \u00a0Roo Forrest (host) (www.rooforrest.com) Couth Buzz...",
//           "url":"https:\/\/www.robby.ai\/e\/seattle\/socializing\/couth-buzzard-espresso-buono\/showcase-couth-buzzard-roster-full\/244865343\/2\/",
//           "ticket":null,
//           "category":"Socializing",
//           "date":"2018-04-08T04:30:00-07:00",
//           "duration":"",
//           "venue":"Couth Buzzard Espresso Buono",
//           "address":"8310 Greenwood Ave. N.",
//           "city":"Seattle",
//           "zip":"98103",
//           "country":null,
//           "lat":null,
//           "lng":null,
//           "distance":9.042299999999999,
//           "images":[  
 
//           ],
//           "videos":[  
 
//           ],
//           "performers":[  
 
//           ]
//        },
//        {  
//           "id":"249398060",
//           "title":"MONTHLY MOBILE MEET UP (IOS \/ ANDROID)",
//           "description":"We have a room reserved in the back. Head to the left and enter through the mirror door. Event: Mobile Meet Up for iOS and Android (Happy Hour) Time: 6:00-7:30PM TEKsystems is inviting you to a busin...",
//           "url":"https:\/\/www.robby.ai\/e\/seattle\/socializing\/liberty-bar\/monthly-mobile-meet-up-ios-android\/249398060\/2\/",
//           "ticket":null,
//           "category":"Socializing",
//           "date":"2018-04-21T02:30:00-07:00",
//           "duration":2,
//           "venue":"Liberty Bar",
//           "address":"517 15th ave E",
//           "city":"Seattle",
//           "zip":"",
//           "country":null,
//           "lat":null,
//           "lng":null,
//           "distance":1.9801,
//           "images":[  
 
//           ],
//           "videos":[  
 
//           ],
//           "performers":[  
 
//           ]
//        }
//     ]
//  }


