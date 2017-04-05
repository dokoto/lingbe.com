'use strict';

const _ = require('underscore');
const Backbone = require('backbone');
const RssView = require('../views/rss');
const constants = require('../../../assets/config/constants');
const FeedCollection = require('../models/feedCollection');


//https://www.npmjs.com/package/rss-to-json
class RssController {
    constructor() {
        _.extend(this, Backbone.Events);
        this.rssView = new RssView({
            build_date: constants.BUILD_DATE,
            version: constants.VERSION_APP,
            title: constants.APP_DESCRIPTION
        });
        this._setListeners();
    }

    _setListeners() {
        this.on('rss:init', this._init.bind(this));
    }

    _init() {
        //APP.getRegion().show(this.rssView);
        let feedCollection = new FeedCollection({
            url: 'https://www.nasa.gov/rss/NASAcast_vodcast.rss'
        });
        feedCollection.on('sync', this._handleRssSync.bind(this));
        feedCollection.on('error', this._handleRssError.bind(this));
        feedCollection.fetch();
    }

    _handleRssSync(feeds) {
        console.log(feeds);
    }

    _handleRssError(error) {
        console.error(error);
    }
}


module.exports = RssController;
