'use strict';

const _ = require('underscore');
const Backbone = require('backbone');
const RssView = require('../views/rss');
const constants = require('../../../assets/config/constants');
const FeedCollection = require('../models/feedCollection');
const defaultFeeds = require('../../../assets/config/default_rss');
const Store = require('../utils/store');
const vex = require('vex-js/src/vex');

require('vex-js/dist/css/vex.css');
require('vex-js/dist/css/vex-theme-wireframe.css');

//https://www.npmjs.com/package/rss-to-json
class RssController {
    constructor() {
        _.extend(this, Backbone.Events);
        this.rssView = null;
        this._setListeners();
        this.sessionFeeds = {};
        this.feedCollection = {};
        vex.registerPlugin(require('vex-dialog/src/vex.dialog'));
        vex.defaultOptions.className = 'vex-theme-wireframe';
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
        this.rssView.on('rss:show', this._handleShowFeed.bind(this));
        this.rssView.on('rss:favorite', this._handleMarkAsFavorite.bind(this));
        APP.getRegion().show(this.rssView);
    }

    _handleNewRss() {
        console.log('New RSS');
        vex.dialog.prompt({
            message: 'Add a new RSS',
            placeholder: 'RSS URL',
            callback: this._handlePopup.bind(this)
        });
    }

    _handlePopup(url) {
        console.log('Handle popup %s', url);
        this.sessionFeeds[url] = [];
        Store.set('feeds', this.sessionFeeds);
        this._getRss(url);
    }

    _handleShowFeed(rssUrl, url) {
        console.log('Handle show feed %s', url);
        if (!this.sessionFeeds[rssUrl][url]) {
            this.sessionFeeds[rssUrl][url] = {};
        }
        this.sessionFeeds[rssUrl][url].read = true;
        Store.set('feeds', this.sessionFeeds);
        window.location.href = url;
    }

    _handleMarkAsFavorite(rssUrl, url) {
        console.log('Handle show feed %s', url);
        if (!this.sessionFeeds[rssUrl][url]) {
            this.sessionFeeds[rssUrl][url] = {};
        }
        this.sessionFeeds[rssUrl][url].favorite = !this.sessionFeeds[rssUrl][url].favorite;
        Store.set('feeds', this.sessionFeeds);
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
