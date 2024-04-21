const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new mongoose.Schema(
  {
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    appointmentType: { type: String, required: true },
    specialRequirements: String,
    status: { type: String, default: "Pending" }, // 例如 Pending, Confirmed, Completed, Cancelled 等
    notes: String, // 任何額外的註釋或者信息
  },
  { timestamps: true }
);

const Resgister = mongoose.model("Resgister", registerSchema);

module.exports = Resgister;
