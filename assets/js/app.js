
$(document).ready(function () {

    $.ajax({
        url:    "https://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1gbt99772tn_adn99&state=il&city=chicago&childtype=neighborhood",    
        method: 'GET',
        dataType: 'xml',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .done(function(result) {
        console.log(result);
    })
})