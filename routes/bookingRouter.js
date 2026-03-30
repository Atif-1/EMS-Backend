const express = require('express');
const Router = express.Router();
const validate = require('../middleware/validate');
const { createBookingValidators } = require('../validators/validators');
const { createBooking } = require('../controller/bookingController');

Router.route("/")
.post(createBookingValidators,validate,createBooking)


module.exports = Router;