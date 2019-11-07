const _ = require('lodash');
    ES = require('elasticsearch'),
    config = require('../config')

module.exports = {
    client: undefined,

    connect: function () {
        this.client = new ES.Client({
            host: config.esDomain, // TODO: pick from env variables
            log: 'debug',
            apiVersion: '7.1', // use the same version of your Elasticsearch instance
        });
    },

    getLocationsInRange: function ({latitude, longitude}, range = 10, cb) {
        if (!this.client) { return cb(new Error('Client connection is not established')); }
        // TODO: perform checks on range, latitude, longitude

        // TODO: get query from queries folder
        this.client.search({
            index: 'australia',
            body: {
                "query": {
                    "bool" : {
                        "must" : {
                            "match_all" : {}
                        },
                        "filter" : {
                            "geo_distance" : {
                                "distance" : `${range}km`,
                                "location" : {
                                    "lat" : latitude,
                                    "lon" : longitude
                                }
                            }
                        }
                    }
                }
            },
            size: 20 // Max points returned TODO: change this to a dynamic value/parameter
        }, function (err, res) {
            if (err) { return cb(err); }

            // Parse ES response structure and return locations
            locations = _.map(_.get(res, 'hits.hits'), (location) => {
                return _.get(location, '_source');
            });

            return cb(null, locations);
        });
    }
}