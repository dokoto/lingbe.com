'use strict';

const basicAuth = require('basic-auth');

module.exports = function(req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    var user = basicAuth(req);
    console.log('Authorizating %s', JSON.stringify(user));
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === 'manuel' && user.pass === 'lingbe') {
        return next();
    } else {
        return unauthorized(res);
    }
};
