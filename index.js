const express = require('express'),
    app = express(),
    port = 3000,
    esInterface = require('./esHelper');

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
    // TODO: covert user location to latitude, longitude
    // google maps api
    
    // TODO: query elasticsearch to retrieve points in range
    // esInterface.query()

    // TODO: send response to frontend for displaying points
    res.send('hi there. This is a post request');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)

    // TODO: create connection to elasticsearch server
    // esInterface.connect()
});