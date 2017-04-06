'use strict';

const Backbone = require('backbone');


class FeedCollection extends Backbone.Collection {
    constructor(options) {
        super();
        this.url = options.url;
        this.fetch = this._fetch.bind(this);
    }

    _fetch(response, options) {
        console.log(options);
        $.ajax({
            url: this.url,
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: "xml",
            success: this._handleFetchSuccess.bind(this),
            fail: this._handleFetchFail.bind(this)
        });
    }

    _handleFetchSuccess(data) {
        let model = this;
        $(data).find("item").each(function(index, value) {
            model.add([{
                title: $(this).find("title").text(),
                link: $(this).find("link").text(),
                description: $(this).find("description").text(),
                read: false,
                favorite: false
            }]);
        });
        model.trigger('sync', model);
    }

    _handleFetchFail(jqXHR, textStatus, errorThrown ) {
        console.log(textStatus);
    }
}

module.exports = FeedCollection;
