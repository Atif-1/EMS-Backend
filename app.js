const express=require('express');
const helmet=require('helmet');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require('dotenv').config();
app.use(helmet());
app.use(cors("*"));
const eventRouter=require("./routes/eventRouter");
const bookingRouter=require("./routes/bookingRouter");
const userRouter=require("./routes/userRouter");

app.use("/events",eventRouter);
app.use("/bookings",bookingRouter);
app.use("/users",userRouter);





app.get('/', (req, res) => res.json({ success: true, message: 'Welcome To BookKaro! An Event Management App' }));

module.exports = app;