const dashboard = require("../domains/domain.dashboard.js");
require("../functions/conntect-mongo.js").connectMongo("BookingSystem");

let id;

// test to create a new customer
/**
 * 測試就是產品邏輯
 * 1. 創建一個新的客戶
 * 2. 創建一個新的預約
 * 3. 創建一個新的客戶->創建一個新的預約->創建一個新的報到
 * 4  若點選預約的客戶為新客戶，則創建一個新的客戶，並更新客戶顯示列表，並新增一筆報到記錄
 * 5. 若點選預約的客戶為舊客戶，則更新客戶顯示列表，則新增一筆報到記錄
 */
(async () => {
  const customer = {
    name: "Aaron1",
    address: "Taipei",
    phone: "0912345678",
    cussn: "cuss123123123",
    tid: "a123456",
    state: {
      status: "active",
      level: 1,
    },
    data: {
      age: 30,
    },
  };

  const newCustomer = await dashboard.command.createCustomer(customer);

  id = newCustomer._id;

  const booking = {
    status: "active",
    date: "2021-10-10",
    customerInfo: {
      name: "Aaron1",
      address: "Taipei",
      phone: "0912345678",
      cussn: newCustomer.cussn,
      ref: id,
    },
  };

  const newBooking = await dashboard.command.createBooking(booking);
  console.log("newBooking", newBooking);

  const register = {
    appointmentDate: "2021-10-10",
    appointmentTime: "10:00",
    customer: id,
    appointmentType: "type1",
    specialRequirements: "special",
    status: "Pending",
    notes: "notes",
  };

  const newRegister = await dashboard.command.createRegister(register);
  console.log("newRegister", newRegister);
})();
