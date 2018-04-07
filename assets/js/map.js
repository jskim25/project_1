var debug = true;
function dlog(m) {
    if (debug) {
        console.log(m)
    }
}

var mapData = {
    zoom: 13,
    size: '600x150',
    maptype: 'roadmap',
    key: 'AIzaSyAVYci8dAx5V0_7LxKYCVGk4rmg39PNLcE',
    center: ''
}

function makeUrl(mapData) {
    var url = 'https://maps.googleapis.com/maps/api/staticmap?';
    return url + '?' + $.param(mapData)
}

function displayMap(strWhere) {
    console.log(`displayMap called with cityName ${strWhere}`)
//             ////////////////////////////////////////////////
//             ////////////////////////////////////////////////
//             ///  STATIC MAP
//             ////////////////////////////////////////////////
//             ////////////////////////////////////////////////
            dlog(`will draw static map next`);
            mapData.center=strWhere;
            dlog(`mapData = ${mapData}`);
            // var U = makeUrl(mapData);
            // var newImg = $('<img>');
            // $(newImg).attr('src',U);

            // dlog(`newURL: ${U}`)

            // $('#sub-right').empty();
            // $('#sub-right').append(newImg);
}