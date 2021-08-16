const request = require('postman-request');

const geocode = (address,callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+process.env.MAP_BOX_ACCESS_TOKEN+'&limit=1';
    
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Cannot connect to geoCode services!!',undefined);
        } else if(body.features.length === 0) {
            callback('Cannot find this location.. Search another one.',undefined);
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;