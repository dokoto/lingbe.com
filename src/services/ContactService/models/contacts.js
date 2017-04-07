'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    book: {
        type: String,
        trim: true,
        index: true,
    },
    name: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        match: [/^[0-9]{1,9}$/, 'Please fill a valid phone number'],
        trim: true
    },
    mobile: {
        type: String,
        match: [/^[0-9]{1,9}$/, 'Please fill a valid mobile phone number'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        default: ''
    }
});
