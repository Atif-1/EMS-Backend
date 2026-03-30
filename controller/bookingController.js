const db = require("../models/index");
const {v4: uuidv4}=require("uuid");


exports.createBooking=async(req,res,next)=>{

    const { user_id, event_id, ticket_count = 1 } = req.body;
    const t = await db.sequelize.transaction();
        try {
       
        const event = await db.Event.findOne({
        where: { id: event_id },
        transaction: t,
        lock: t.LOCK.UPDATE
        });
        if (!event) {
        await t.rollback();
        return res.status(404).json({ status: 'error', message: 'Event not found' });
        }

        if (event && event.remaining_tickets < ticket_count) {
        await t.rollback();
        return res.status(400).json({ status: 'error', message: 'Not enough tickets available' });
        }

        event.remaining_tickets = event.remaining_tickets - ticket_count;
        await event.save({ transaction: t });

        
        const booking_code = uuidv4();
        const booking = await db.Booking.create({
        user_id,
        event_id,
        ticket_count,
        booking_code
        }, { transaction: t });

        await t.commit();
        return res.status(201).json({ status: 'success', data: booking });
        
    } catch (err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Failed to create booking' });
    }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
     const page = Math.max(1, parseInt(req.query.page) || 1);
   const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const { rows: bookings, count } = await db.Booking.findAndCountAll({
      where: { user_id: userId },
      include: [
        { model: db.Event, attributes: ['id','title','event_date'] }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    return res.status(200).json({
      status: 'success',
      data: bookings,
      total: count,
      Page: page,
      limit: limit ,
      totalPages: Math.ceil(count / limit) 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Failed to fetch bookings' });
  }
};
