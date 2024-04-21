const domain = require("../domains/domain.dashboard.js");
const express = require("express");
const router = express.Router();

// Get customer

router.get("/domain/customer", async (req, res) => {
  const cussn = req.query.cussn;
  const customer = await domain.query.getCustomer({ cussn });
  res.json(customer);
});

// Get register

router.get("/domain/register", async (req, res) => {
  const appointmentDate = req.query.appointmentDate;
  const register = await domain.query.getRegister({ appointmentDate });
  res.json(register);
});

// Get booking

router.get("/domain/booking", async (req, res) => {
  const date = req.query.date;
  const booking = await domain.query.getBooking({ date });
  res.json(booking);
});

// Get all customers

router.get("/domain/allBookings", async (req, res) => {
  const customers = await domain.query.getAllBookings();
  res.json(customers);
});

// post customer
router.post("/domain/customer", async (req, res) => {
  const customerData = req.body;
  const newCustomer = await domain.command.createCustomer(customerData);
  res.json(newCustomer);
});

// post booking
router.post("/domain/booking", async (req, res) => {
  const bookingData = req.body;
  const newBooking = await domain.command.createBooking(bookingData);
  res.json(newBooking);
});

// post register
router.post("/domain/register", async (req, res) => {
  const registerData = req.body;
  const newRegister = await domain.command.createRegister(registerData);
  res.json(newRegister);
});
// update booking status
router.put("/domain/booking/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBooking = await domain.command.updateBookingStatus(id);
  res.json(updatedBooking);
});

module.exports = router;
