'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const db = mongoose.connect('http://localhost:4040/contact');
const authentication = require('./authMidleware');


// curl -k "https://127.0.0.1:8080/api/v1/contact/:addressbook/:contact"
router.get('/contact/:addressbook/:contact', authentication, function(request, response) {
    console.log('GET > addressbook: %s contact: %s', request.params.addressbook, request.params.contact);    
    response.status(200).json(JSON.stringify({
        error: false
    }));
});

// curl -k "https://127.0.0.1:8080/api/v1/contact/:addressbook"
router.get('/contact/:addressbook', authentication, function(request, response) {
    console.log('GET > addressbook: %s', request.params.addressbook);
    response.status(200).json(JSON.stringify({
        error: false
    }));
});

// curl -k "https://127.0.0.1:8080/api/v1/contact/:addressbook"
router.post('/contact/:addressbook', authentication, function(request, response) {
    console.log('POST > addressbook: %s', request.params.addressbook);
    response.status(201).json(JSON.stringify({
        error: false
    }));
});

// curl -k "https://127.0.0.1:8080/api/v1/contact/:addressbook"
router.post('/contact/:addressbook/:contact', authentication, function(request, response) {
    console.log('POST > addressbook: %s contact: %s', request.params.addressbook, request.params.contact);
    response.status(201).json(JSON.stringify({
        error: false
    }));
});

module.exports = router;
