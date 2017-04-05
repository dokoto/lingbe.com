'use strict';


const _ = require('underscore');

class Store {
    static get(key) {
        var data = null;
        try {
            data = window.localStorage.getItem(key);
            data = JSON.parse(data);
        } catch (err) {
            console.warn('[UTILS.SESSION] KEY %s', key);
            console.warn('[UTILS.SESSION] %o', err);
        }
        return data;
    }

    static set(key, data) {
        try {
            if (_.isObject(data)) {
                data = JSON.stringify(data);
            }
            console.log('[UTILS.STORE] Session KEY %s', key);
            console.log('[UTILS.STORE] Session DATA %s', ((data.length > 100) ? data.substr(0, 100) + '....' : data));

            window.localStorage.setItem(key, data);
        } catch (err) {
            console.warn('[UTILS.STORE] KEY %s DATA %o', key, data);
            console.warn('[UTILS.STORE] %o', err);
        }
    }

    static delete(key) {
        window.localStorage.removeItem(key);
    }
}

module.exports = Store;
