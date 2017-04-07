'use strict';

const mongoose = require('mongoose');

class Post {
    constructor(model) {
        this.model = model;
    }

    name(request, response) {
        console.log('PUT > params: %s ', JSON.stringify(request.params));
        console.log('PUT > body: %s ', JSON.stringify(request.body));
        let Contact = mongoose.model('Contact', this.model);
        Contact.findOneAndUpdate({
            book: request.params.book,
            name: request.params.name,
        }, {
            phone: request.body.phone,
            mobile: request.body.mobile,
            email: request.body.email
        }, function(err, book) {
            if (err) {
                response.status(200).json(JSON.stringify({
                    error: err
                }));
            } else {
                response.status(200).json(JSON.stringify({
                    modified: true
                }));
            }
        });
    }
}

module.exports = Post;
