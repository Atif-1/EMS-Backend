const express = require('express');
const Router = express.Router();
const validate = require('../middleware/validate');
const { createEventValidators } = require('../validators/validators');
const {getEvents,createEvent,getTicketsByCode} = require('../controller/eventController');

Router.route("/")
.get(getEvents)
.post(createEventValidators,validate,createEvent)

Router.route("/:id/attendance")
.post(getTicketsByCode)


module.exports = Router;