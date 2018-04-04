$(document).ready(function() {

    var result_chicago = 

    $('#submitBtn').on('click', function(event) {
        // event.preventDefault();
        // $.ajax({
        //     url:    "https://maps.googleapis.com/maps/api/place/nearbysearch/json",    
        //     method: 'GET',
        //     data: {
        //         location: '41.881832, -87.623177',
        //         radius: 24000,
        //         type: 'hotel',
        //         key: 'AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE'
        //     }
        // })
        // .done(function(result) {
        //     console.log(result);
        // })


        var map;
        var service;
        var infowindow;
        
        function initialize() {
          var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
        
          map = new google.maps.Map(document.getElementById('map'), {
              center: pyrmont,
              zoom: 15
            });
        
          var request = {
            location: pyrmont,
            radius: '500',
            type: ['restaurant']
          };
        
          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
        }
        
        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              createMarker(results[i]);
            }
          }
        }
    })
})


