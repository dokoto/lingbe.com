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
            urlFeeds: this.getOption('urlFeeds')
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
        'click .item-title': 'showFeed',
        'click .item-favorite-picture': 'maskAsFavorite'
    },
    newRss: function(e) {
        e.preventDefault();
        this.trigger('rss:new');
    },
    loadRss: function(e) {
        e.preventDefault();
        this.trigger('rss:load', e.target.options[e.target.selectedIndex].value);
    },
    showFeed: function(e) {
        e.preventDefault();
        $(e.target).addClass('read');
        this.trigger('rss:show', $('select.rss-urls option:selected').val(), e.target.href);
    },
    maskAsFavorite: function(e) {
        e.preventDefault();
        $(e.target).toggleClass('unfavorite');
        this.trigger('rss:favorite', $('select.rss-urls option:selected').val(), $(e.target).parent().parent().find('.item-title').attr('href'));
    }
});

module.exports = RssViewLayout;
