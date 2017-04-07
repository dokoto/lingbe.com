'use strict';

const mongoose = require('mongoose');

class Post {
    constructor(model) {
        this.model = model;
    }

    name(request, response) {
        console.log('POST > params: %s ', JSON.stringify(request.params));
        console.log('POST > body: %s ', JSON.stringify(request.body));
        let Contact = mongoose.model('Contact', this.model);
        let contact = new Contact({
            book: request.params.book,
            name: request.params.name,
            phone: request.body.phone,
            mobile: request.body.mobile,
            email: request.body.email
        });
        contact.save(function(err) {
            if (err) {
                response.status(200).json(JSON.stringify({
                    error: err
                }));
            } else {
                response.status(201).json(JSON.stringify({
                    success: true
                }));
            }
        });
    }
}

module.exports = Post;
