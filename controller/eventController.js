const db = require("../models/index");

exports.getEvents=async(req,res,next)=>{
    try{
        const data= await db.Event.findAll();
        res.status(200).json({
            status:"success",
            data
        })
    } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch events" });
    }
}

exports.createEvent=async(req,res,next)=>{
    try{
        const { title, description, event_date, total_capacity ,remaining_tickets} = req.body;
        await db.Event.create({
            title,
            description,
            event_date,
            total_capacity,
            remaining_tickets
        })
        res.status(200).json({ status: "success", message: "Event Created" })
        
    } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch events" });
    }
}

exports.getTicketsByCode = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    if (!eventId) return res.status(400).json({ status: 'error', message: 'Event Id required' });

     const page = Math.max(1, parseInt(req.query.page) || 1);
   const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Booking.findAndCountAll({
      where: { event_id: eventId },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      data: rows,
      total: count,
      page:page, limit:limit,
      totalPages: Math.ceil(count / limit) 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Failed to fetch booking' });
  }
};

