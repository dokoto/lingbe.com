'use strict';

const RssContainerTpl = require('./templates/rss_container.html');
const RssItemTpl = require('./templates/rss_item.html');
const Marionette = require('backbone.marionette');

require('../../sass/rss.scss');


let RssItem = Marionette.View.extend({
    template: RssItemTpl,
    onRender: function() {
        if (this.el.childElementCount === 1) {
            this.setElement(this.el.firstElementChild);
        }
    }
});


let RssCollection = Marionette.CollectionView.extend({
    tagName: 'ul',
    id: 'body-rss-list',
    childView: RssItem,
    className: 'body-rss-list',
    onAttach: function() {
        console.log('[SLIDE VIEW COLLECTION] Attached to DOM');
        this.trigger('rss:render:finished');
    }
});


let RssViewLayout = Marionette.View.extend({
    tagName: 'div',
    className: 'rss-container',
    template: RssContainerTpl,
    childView: RssCollection,
    regions: {
        rssRegion: '.body-rss',
    },
    templateContext: function() {
        return {
            build_date: this.getOption('build_date'),
            version: this.getOption('version'),
            title: this.getOption('title'),
        };
    },
    onRender: function() {
        this.showChildView('rssRegion', new RssCollection({
            collection: this.collection
        }));
    },
    events: {
        'click .header-rss-rigth': 'newRss',
        'change .rss-urls': 'loadRss',
    },
    newRss: function(e) {
        e.preventDefault();
        this.trigger('rss:new');
    },
    loadRss: function(e) {
        e.preventDefault();
        this.trigger('rss:load');
    }
});

module.exports = RssViewLayout;
