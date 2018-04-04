
$(document).ready(function () {

    $.ajax({
        url:    "https://maps.googleapis.com/maps/api/place/nearbysearch/json",    
        method: 'GET',
        dataType: 'xml',
        crossDomain: true,
        data: {
            location: '41.881832, -87.623177',
            radius: 24000,
            type: 'hotel',
            key: 'AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE'
        }
    })
    .done(function(result) {
        console.log(result);
    })
})