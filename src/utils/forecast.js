const request = require('postman-request');


const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=741073be24ac0ef351523c63ed7097e4&query='+longitude+','+latitude+'&units=f';

    request({url,json:true},(error,{body})=>{
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