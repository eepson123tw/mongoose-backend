const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    cussn: String, // 假設這是一個可選字段，它的具體含義需要進一步的信息
    tid: String, // 這可能是交易ID或者其他識別碼
    state: {}, // 如果這是一個包含多個值的複雜字段，可以設置為混合類型
    data: {}, // 同上，如果這是一個包含多個值的複雜字段，可以設置為混合類型
    createDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
