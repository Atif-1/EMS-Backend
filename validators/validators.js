const { body, param } = require('express-validator');

const createEventValidators = [
  body('title').isString().isLength({ min: 1, max: 255 }),
  body('description').optional().isString(),
  body('event_date').isISO8601(),
  body('total_capacity').isInt({ min: 1 })
];

const createBookingValidators = [
  body('user_id').isInt({ min: 1 }),
  body('event_id').isInt({ min: 1 }),
  body('ticket_count').optional().isInt({ min: 1 }).toInt()
];

const attendanceValidators = [
  param('id').isInt({ min: 1 }),
  body('booking_code').isString().notEmpty()
];

module.exports = { createEventValidators, createBookingValidators, attendanceValidators };
