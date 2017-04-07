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
        const address = this.address();
        console.log('Service listening connections at https://%s:%s with pid: ', '127.0.0.1', address.port, process.pid);
    }

    _handleServer() {
        https.createServer(this._options, this.restful.app).listen(8080, this._handleHttpServer);
    }

    _setOptions() {
        if (ncluster.isMaster) {
            console.log('ALERTA !!! HAY QUE REGENERAR LAS KEYS');
        }
        this._options.key = fs.readFileSync(path.join(__dirname, 'config/certs/key.pem'));
        this._options.cert = fs.readFileSync(path.join(__dirname, 'config/certs/cert.pem'));
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
