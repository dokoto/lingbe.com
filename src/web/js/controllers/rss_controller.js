'use strict';

const _ = require('underscore');
const Backbone = require('backbone');
const RssView = require('../views/rss');
const constants = require('../../../assets/config/constants');
const FeedCollection = require('../models/feedCollection');
const defaultFeeds = require('../../../assets/config/default_rss');
const Store = require('../utils/store');

//https://www.npmjs.com/package/rss-to-json
class RssController {
    constructor() {
        _.extend(this, Backbone.Events);
        this.rssView = null;
        this._setListeners();
        this.sessionFeeds = {};
        this.feedCollection = {};
    }

    _setListeners() {
        this.on('rss:init', this._init.bind(this));
    }

    _init() {
        try {
            this._getSession();
            this._getRss(Object.keys(this.sessionFeeds)[0]);
        } catch (error) {
            console.error(error);
        }
    }

    _getSession() {
        this.sessionFeeds = Store.get('feeds');
        if (!this.sessionFeeds) {
            this.sessionFeeds = defaultFeeds;
        }
    }

    _getRss(url) {
        this.feedCollection = new FeedCollection({
            'url': url
        });
        this.feedCollection.once('sync', this._handleRssSync.bind(this, url));
        this.feedCollection.once('error', this._handleRssError.bind(this));
        this.feedCollection.fetch();
    }

    _mergeRss(url, feeds) {
        for (let i in this.sessionFeeds[url]) {
            let sessionFeed = this.sessionFeeds[url][i];
            let feed = feeds.findWhere(sessionFeed);
            if (feed) {
                feed.read = sessionFeed.read || false;
                feed.favorite = sessionFeed.favorite || false;
            }
        }
        return feeds;
    }

    _handleRssSync(url, feeds) {
        feeds = this._mergeRss(url, feeds);
        this.rssView = new RssView({
            collection: feeds,
            urlFeeds: Object.keys(this.sessionFeeds)
        });
        this.rssView.on('rss:new', this._handleNewRss.bind(this));
        this.rssView.on('rss:load', this._handleLoadRss.bind(this));
        APP.getRegion().show(this.rssView);
    }

    _handleNewRss() {
        console.log('New RSS');
    }

    _handleLoadRss(url) {
        console.log('Load rss: %s', url);
        this._getRss(url);
    }

    _handleRssError(error) {
        console.error(error);
    }
}


module.exports = RssController;
