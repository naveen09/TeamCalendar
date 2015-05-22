'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();
router.get('/', controller.test);
router.get('/caList', controller.caList);
router.get('/all', controller.all);
router.get('/:userid', controller.event);
router.post('/addEvent', controller.addEvent);
router.post('/deleteEvent', controller.deleteEvent);
module.exports = router;