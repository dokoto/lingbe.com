'use strict';

const router = require('express').Router();
const authentication = require('../modules/auth/basicAuth');
const contactMethods = require('../modules/contacts/methods');


// curl -k --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.get('/contact/:book/:name', authentication, function(request, response) {
    contactMethods.get.name(request, response);
});

// curl -k --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco"
router.get('/contact/:book', authentication, function(request, response) {
    contactMethods.get.book(request, response);
});

// curl -k -X POST -H 'Content-Type: application/json' -d '{"phone":"914657387","mobile":"655542367", "email":"rosa@gmail.com"}' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.post('/contact/:book/:name', authentication, function(request, response) {
    contactMethods.post.name(request, response);
});

// curl -k -X PUT -H 'Content-Type: application/json' -d '{"phone":"9899999","mobile":"6888888", "email":"rosa.perez@gmail.com"}' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.put('/contact/:book/:name', authentication, function(request, response) {
    contactMethods.put.name(request, response);
});

// curl -k -X DELETE -H 'Content-Type: application/json' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
router.delete('/contact/:book/:name', authentication, function(request, response) {
    contactMethods.delete.name(request, response);
});

module.exports = router;
