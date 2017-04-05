'use strict';

module.exports = {
    initialize: function(options) {
        console.log('[ROUTER] initialization');
    },
    rss: function() {},
    regions: {
        appRegion: '#app-region',
        settingsRegion: '#settings-region',
        headerRegion: '#header-region',
        mainRegion: '#main-region',
        dialogRegion: '#dialog-region',
        bpopupRegion: '#bpopup-region'
    }
};
