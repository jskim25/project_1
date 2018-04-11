var debug = true;
function dlog(m) {
    if (debug) {
        console.log(m)
    }
}

var mapData = {
    zoom: 13,
    size: '600x300',
    maptype: 'roadmap',
    key: 'AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE',
    center: ''
}

function makeUrl(mapData) {
    var url = 'http://maps.googleapis.com/maps/api/staticmap?';
    return url + $.param(mapData)
}

function displayMap(strWhere) {
    mapData.center=strWhere;
    dlog(mapData);
    var U = makeUrl(mapData);
    var newImg = $('<img>');
    $(newImg).attr('src',U);

    dlog(`newURL: ${U}`)

    $('#map').empty();
    $('#map').append(newImg);
}