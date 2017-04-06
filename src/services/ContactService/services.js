'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/contact');
const authentication = require('./authMidleware');


const contactSchema = new mongoose.Schema({
    book: 'string',
    name: 'string',
    phone: 'string',
    mobile: 'string'
});

// curl -k --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/manuel"
router.get('/contact/:addressbook/:name', authentication, function(request, response) {
    console.log('GET > params: %s ', JSON.stringify(request.params));
    let Contact = mongoose.model('Contact', contactSchema);
    Contact.find({
        book: request.params.addressbook,
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
});

// curl -k --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco"
router.get('/contact/:addressbook', authentication, function(request, response) {
    console.log('GET > params: %s ', JSON.stringify(request.params));
    let Contact = mongoose.model('Contact', contactSchema);
    Contact.find({
        book: request.params.addressbook
    }).exec(function(err, book) {
        if (err) {
            response.status(200).json(JSON.stringify({
                error: err
            }));
        } else {
            response.status(200).json(JSON.stringify(book));
        }
    });
});

// curl -k -X POST -H 'Content-Type: application/json' -d '{"phone":"914657387","mobile":"655542367"}' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.post('/contact/:addressbook/:name', authentication, function(request, response) {
    console.log('POST > params: %s ', JSON.stringify(request.params));
    console.log('POST > body: %s ', JSON.stringify(request.body));
    let Contact = mongoose.model('Contact', contactSchema);
    let contact = new Contact({
        book: request.params.addressbook,
        name: request.params.name,
        phone: request.body.phone,
        mobile: request.body.mobile
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

});

// curl -k -X PUT -H 'Content-Type: application/json' -d '{"phone":"9999999","mobile":"8888888"}' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.put('/contact/:addressbook/:name', authentication, function(request, response) {
    console.log('PUT > params: %s ', JSON.stringify(request.params));
    console.log('PUT > body: %s ', JSON.stringify(request.body));
    let Contact = mongoose.model('Contact', contactSchema);
    Contact.findOneAndUpdate({
        book: request.params.addressbook,
        name: request.params.name,
    }, {
        phone: request.body.phone,
        mobile: request.body.mobile
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
});

// curl -k -X DELETE -H 'Content-Type: application/json' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.delete('/contact/:addressbook/:name', authentication, function(request, response) {
    console.log('DELETE > params: %s ', JSON.stringify(request.params));
    let Contact = mongoose.model('Contact', contactSchema);
    Contact.deleteOne({
        book: request.params.addressbook,
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
});

module.exports = router;
