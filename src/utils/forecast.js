const request = require('postman-request');


const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' +
    longitude + '&appid='+ process.env.OPEN_WEATHER_MAP_KEY +'&units=metric';
    

    request({url,json:true},(error,{body})=>{
        console.log(body);
        if(error) {
            callback('Cannot Connect to the weather Services',undefined);
        } else if(body.error) {
            callback('Unable to find location.. Please enter another one',undefined);
        } else {
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out.");
        }
    });
} 

module.exports = forecast;