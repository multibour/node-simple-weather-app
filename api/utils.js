const request = require('request');
const fs = require('fs');

const APIKeys = JSON.parse(fs.readFileSync(__dirname+'/APIKeys.json', 'utf-8'));


function getGeocode(address, callback) {
    request({
        url: `https://us1.locationiq.com/v1/search.php?key=${APIKeys.LocationIQ_APIKey}&q=${encodeURI(address)}&format=json&limit=1`,
        json: true, // automatically parse JSON
    }, (error, response) => {
        if (error)
            callback('Could not connect LocationIQ.', undefined);

        else if (!Array.isArray(response.body))
            // if there is an error, the API returns an object instead of an array of objects
            callback(response.body.error, undefined);

        else
            callback(undefined, {
                latitude: response.body[0].lat,
                longitude: response.body[0].lon,
                name: response.body[0].display_name
            });
    });

}


function forecast(latitude, longitude, callback){
    request({
        url: ` https://api.darksky.net/forecast/${APIKeys.Darksky_APIKey}/${latitude},${longitude}?units=si`,
        json: true, // automatically parse JSON
    }, (error, response) => {
        const currentWeather = response.body.currently;

        if(error)
            callback('Could not connect to DarkSky.', undefined);
        else if (response.body.error)
            callback(response.body.error, undefined);
        else{
            callback(undefined, `${response.body.currently.summary} and ${response.body.currently.temperature} Celsius degrees.`
                + ` ${response.body.currently.precipProbability*100}% chance of precipitation and ${response.body.currently.humidity*100}% humidity.`);
        }
    });
}


module.exports = {
    getGeocode: getGeocode,
    forecast: forecast
};
