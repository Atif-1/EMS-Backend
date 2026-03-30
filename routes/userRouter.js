const express = require('express');
const Router = express.Router();
const { getUserBookings } = require('../controller/bookingController');

Router.route("/:id/bookings")
.get(getUserBookings);



module.exports = Router;