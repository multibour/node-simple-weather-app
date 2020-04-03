const path = require('path');
const hbs = require('hbs');
const utils = require('./../api/utils');

const express = require('express');
const app = express();

// set up handlebars engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'files'));
hbs.registerPartials(path.join(__dirname, 'files/partials'));

// set up the directory of the static files that the engine will access
app.use(express.static(path.join(__dirname, 'files')));

app.get('/', (req, res) => {
    res.render('index', {
        header: 'Welcome',
        text: 'Welcome to my site.'
    });
});

app.get('/about', (req, res) => {
    res.render('index', {
        header: 'About',
        text: 'This site was created to explore some functionality of Node.js. It is a simple, unaesthetic site where weather data of any address can be queried. It uses LocationIQ API to get the coordinates of a given address and DarkSky API to fetch the weather data of these coordinates.'
    })
});

app.get('/weather', (req, res) => {

    res.render('weather', {
        header: 'Weather',
        text: 'Query the current weather of an address.'
    });
});

app.get('/weatherapp', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'An address value needs to be provided.'
        });

    // get weather
    utils.getGeocode(req.query.address, (error, geoData) => {
        if (error)
            return res.send({ error });

        utils.forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if (error)
                return res.send({ error });

            res.send({
                address: req.query.address,
                location: geoData.name,
                forecast: forecastData
            });
        });
    });

});

app.get('*', (req, res) => {
    res.status(404);
    res.render('index', {
        header: '404 - Page not found',
        text: 'Page could not be found.'
    });
});


app.listen(process.env.PORT || 3000, () => {
    console.log('server is started.');
});
