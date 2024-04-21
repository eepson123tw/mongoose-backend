const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, default: "pending" },
    date: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    customerInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      cussn: { type: String, required: true },
      ref: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
