const _ = require('lodash'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    esInterface = require('./interfaces/es'),
    nodeGeocoder = require('node-geocoder'),
    config = require('./config');

var geocoder;

// Used for parsing incoming request as JSON
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to points to map!'));

app.post('/', (req, res) => {
    var address,
        reqBody = _.get(req, 'body');
    
    // TODO: validate request
    console.log(req.body);
    
    if (!reqBody) { return res.status(400).send('No body in request'); }

    address = _.get(reqBody, 'address');
    range = _.get(reqBody, 'range') || 10;
    
    if (!address) { return res.status(400).send('Address not provided or incorrect request format'); }
    
    // Convert user provided address to latitude, longitude
    geocoder.geocode({ 'address': address, countryCode: 'AU' }, function (err, geolocations) {
        if (err) { 
            console.log('geocode error', err);
            return res.status(400).send(err); 
        }

        // TODO: multiple geolocations can exist for an address, need to select the right one
        let point = {
            latitude: geolocations[0].latitude,
            longitude: geolocations[0].longitude
        }
    
        // Query elasticsearch to retrieve locations in range
        esInterface.getLocationsInRange(point, range, function (err, locations) {
            if (err) { return res.status(404).send(err); } // TODO: better error handling/status code
    
            // Send response to frontend for displaying points
            return res.send(locations);
        });
    });
});

app.listen(config.port, () => {
    // TODO: check for config initialization
    console.log(`Webserver listening on port ${config.port}!`) // TODO: need log levels

    var options = {
        provider: 'opencage',
        httpAdapter: 'https',
        // TODO provide API key
        apiKey: config.openCageKey,
        formatter: null
    };

    geocoder = nodeGeocoder(options);

    // Create connection to elasticsearch server
    esInterface.connect()
});
