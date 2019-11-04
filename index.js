const _ = require('lodash'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    esInterface = require('./interfaces/es'),
    port = 3000; // TODO: pick from env variables

// Used for parsing incoming request as JSON
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to points to map!'));

app.post('/', (req, res) => {
    var address;
    // TODO: validate request
    address = _.get(req.body.address)
    
    if (!address) { return res.status(400).send('Address not provided or incorrect request format'); }

    // TODO: covert user provided address to latitude, longitude
    // google maps api

    // Query elasticsearch to retrieve locations in range. TODO: update long/lat input
    esInterface.getLocationsInRange({ latitude: 47.29762, longitude : 8.3086}, 10, function (err, locations) {
        if (err) { return res.status(404).send(err); } // TODO: better error handling/status code

        // send response to frontend for displaying points
        res.send(locations);
    });
});

app.listen(port, () => {
    console.log(`Webserver listening on port ${port}!`) // TODO: need log levels

    // Create connection to elasticsearch server
    esInterface.connect()
});