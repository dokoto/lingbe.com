'use strict';


const model = require('../../models/contacts');
const constants = require('../../config/constants');
const mongoose = require('mongoose');
const db = mongoose.connect(constants.MONGODB.URL + ':' + constants.MONGODB.PORT + constants.MONGODB.DB);

const Get = require('./get');
const Put = require('./put');
const Post = require('./post');
const Delete = require('./delete');

class Methods {
    constructor() {
        this.get = new Get(model);
        this.put = new Put(model);
        this.post = new Post(model);
        this.delete = new Delete(model);
    }
}

module.exports = new Methods();
