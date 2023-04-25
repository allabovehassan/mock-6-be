const express = require("express");

const { bookingModel } = require("../model/booking_Model");

const bookingRouter = express.Router();

bookingRouter.post("/", async (req, res) => {
  let payload = req.body;
  try {
    let booking = new bookingModel(payload);
    await booking.save();
    res.status(201).send("Booking Created Sucessfully");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});




module.exports = { bookingRouter };
