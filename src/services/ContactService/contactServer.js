'use strict';

const https = require('https');
const cluster = require('express-cluster');
const fs = require('fs');
const path = require('path');
const Restful = require('./restful');
const ncluster = require('cluster');

class ContactServer {
    constructor() {
        this.restful = new Restful();
        this._options = {};
    }

    _handleHttpServer() {
        console.log('Service listening connections at https://%s:%s with pid: ', '127.0.0.1', '8080', process.pid);
    }

    _handleServer() {
        https.createServer(this._options, this.restful.app).listen(8080, this._handleHttpServer.bind(this));
    }

    _setOptions() {
        if (ncluster.isMaster) {
            console.log('ALERTA !!! HAY QUE REGENERAR LAS KEYS');
        }
        this._options.key = fs.readFileSync(path.join(process.cwd(), 'config/certs/key.pem'));
        this._options.cert = fs.readFileSync(path.join(process.cwd(), 'config/certs/cert.pem'));
    }

    start() {
        this._setOptions();
        if (process.argv.indexOf('--cluster') !== -1) {
            cluster(this._handleServer.bind(this));
        } else {
            this._handleServer();
        }
    }
}

module.exports = ContactServer;
