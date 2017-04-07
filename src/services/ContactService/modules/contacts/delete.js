'use strict';

const mongoose = require('mongoose');

class Post {
    constructor(model) {
        this.model = model;
    }

    name(request, response) {
        console.log('DELETE > params: %s ', JSON.stringify(request.params));
        let Contact = mongoose.model('Contact', this.model);
        Contact.deleteOne({
            book: request.params.book,
            name: request.params.name,
        }, function(err) {
            if (err) {
                response.status(200).json(JSON.stringify({
                    error: err
                }));
            } else {
                response.status(200).json(JSON.stringify({
                    deleted: true
                }));
            }
        });
    }
}

module.exports = Post;
