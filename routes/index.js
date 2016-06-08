var express = require('express');
var router = express.Router();

var apiUrl = "https://ACCOUNT.api-us1.com";
var apiKey = "KEY";

router.get('/', function(req, res, next) {

    res.render('root');
});

/* GET credentials_test. */
router.get('/credentials_test', function(req, res, next) {

    var ac = new require("activecampaign")(apiUrl, apiKey);
    ac.credentials_test().then(function(result) {

        console.log('-------------------------------------------');
        console.log(result);
        console.log('-------------------------------------------');

        // successful request
        if (result.success) {
            // VALID ACCOUNT
            console.log('success');
            res.render('index', { title: 'Success (credentials_test)', response: result.result_code });
        } else {
            // INVALID ACCOUNT
            console.log('failed');
            res.render('index', { title: 'Failed (credentials_test)', response: result.result_code });
        }
    }, function(result) {
        // request error
        res.render('error', { message: 'Error (credentials_test)', response: result.result_code });
    });
});


/* GET user_me. tes */
router.get('/user_me', function(req, res, next) {

    var ac2 = new require("activecampaign")(apiUrl, apiKey);
    ac2.api("user/me", {}).then(function (result) {

        console.log('-------------------------------------------');
        console.log(result);
        console.log('-------------------------------------------');

        // successful request
        if (result.success) {
            // VALID ACCOUNT
            console.log('success');
            res.render('index', { title: 'Success (user_me)', response: result.result_code });
        } else {
            // INVALID ACCOUNT
            console.log('failed');
            res.render('index', { title: 'Failed (user_me)', response: result.result_code });
        }
    }, function(result) {
        // request error
        res.render('error', { message: 'Error (user_me)', response: result.result_code });
    });
});

/* GET list_paginator. test */
router.get('/list_paginator', function(req, res, next) {

    var ac3 = new require("activecampaign")(apiUrl, apiKey);
    ac3.api("list/paginator?sort=&offset=0&limit=1000&filter=&public=", {}).then(function(result) {

        console.log('-------------------------------------------');
        console.log(result);
        console.log('-------------------------------------------');

        if (result.total > 0) {
            console.log('success');
            res.render('index', { title: 'Success (list_paginator)', response: result });
        } else {
            res.render('error', { message: 'Error (list_paginator)', response: result });
        }
    });
});

module.exports = router;
