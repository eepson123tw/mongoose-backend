const dashboard = require("../domains/domain.dashboard.js");
const mongoose = require("../functions/conntect-mongo.js");

let id;

// test to create a new customer
/**
 * 
 *   name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    cuss: String, // 假設這是一個可選字段，它的具體含義需要進一步的信息
    tid: String, // 這可能是交易ID或者其他識別碼
    state: {}, // 如果這是一個包含多個值的複雜字段，可以設置為混合類型
    data: {}, // 同上，如果這是一個包含多個值的複雜字段，可以設置為混合類型
    createDate: { type: Date, default: Date.now },
 * 
 *  */
(async () => {
  const customer = await dashboard.query.getCustomer({
    cussn: "cuss123123123",
  });
  console.log("customer", customer);
  const register = await dashboard.query.getRegister({
    appointmentDate: "2021-10-10T00:00:00.000+00:00",
  });
  console.log("register", register);
  const booking = await dashboard.query.getBooking({ date: "2021-10-10" });
  console.log("booking", booking);
})();
