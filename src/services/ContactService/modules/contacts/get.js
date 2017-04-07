'use strict';

const mongoose = require('mongoose');

class Get {
    constructor(model) {
        this.model = model;
    }

    name(request, response) {
        console.log('GET > params: %s ', JSON.stringify(request.params));
        let Contact = mongoose.model('Contact', this.model);
        Contact.find({
            book: request.params.book,
            name: request.params.name
        }).exec(function(err, book) {
            if (err) {
                response.status(200).json(JSON.stringify({
                    error: err
                }));
            } else {
                response.status(200).json(JSON.stringify(book));
            }
        });
    }

    book(request, response) {
        console.log('GET > params: %s ', JSON.stringify(request.params));
        let Contact = mongoose.model('Contact', this.model);
        Contact.find({
            book: request.params.book
        }).exec(function(err, book) {
            if (err) {
                response.status(200).json(JSON.stringify({
                    error: err
                }));
            } else {
                response.status(200).json(JSON.stringify(book));
            }
        });
    }
}

module.exports = Get;
