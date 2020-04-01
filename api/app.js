const utils = require('./utils.js');


const address = process.argv[2];

if (address === undefined)
    return console.log('Provide an address.');

utils.getGeocode(address, (error, geoData) => {
    if (error)
        return console.log(error);

    utils.forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
        if (error)
            return console.log(error);
        console.log(geoData.name + ': ' + forecastData);
    });
});
