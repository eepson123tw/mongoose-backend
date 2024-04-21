const Customer = require("../models/model.customers");
const Register = require("../models/model.resgisters");
const Booking = require("../models/model.bookings");

const query = {
  getCustomer: async (cussn) => {
    try {
      console.log(cussn);
      const customers = await Customer.find(cussn);
      return customers;
    } catch (error) {}
  },
  getRegister: async (appointmentDate) => {
    try {
      //  todo: 關聯查詢 患者信息 是否為新患者 需要研究 flow
      const registers = await Register.find(appointmentDate)
        .populate("customer", "name phone cussn") // 只撈取 name 和 phone
        .exec();
      return registers;
    } catch (error) {}
  },
  getBooking: async (date) => {
    try {
      const bookings = await Booking.find(date);
      return bookings;
    } catch (error) {}
  },
  getAllBookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings;
    } catch (error) {}
  },
};

const command = {
  createBooking: async (bookingData) => {
    try {
      const booking = new Booking(bookingData);
      const newBooking = await booking.save();
      return newBooking;
    } catch (error) {}
  },
  createRegister: async (registerData) => {
    try {
      const register = new Register(registerData);
      const newRegister = await register.save();
      return newRegister;
    } catch (error) {}
  },
  createCustomer: async (customerData) => {
    try {
      const customer = new Customer(customerData);
      const newCustomer = await customer.save();
      return newCustomer;
    } catch (error) {}
  },
  // 更新一筆 booking 的狀態，將其狀態 pending -> active
  // 並且創建一筆 register 記錄
  // 如果該 booking 的 customer 不存在，則創建一筆 customer 記錄
  updateBookingStatus: async (id) => {
    try {
      const booking = await Booking.findById(id);
      if (!booking) {
        console.log("Booking not found");
        return null;
      }

      if (booking.status !== "pending") {
        console.log("Booking status is not pending");
      }

      let customer = await Customer.findById(booking.customer);
      if (!customer) {
        // 需要確定這裡提供了創建新客戶所需的所有必須資訊
        // 假設 booking.customerInfo 包含創建新客戶所需的信息
        customer = await command.createCustomer(booking.customerInfo);
      }

      const newRegister = await command.createRegister({
        appointmentDate: new Date(),
        appointmentTime: "10:00",
        customer: customer._id,
        appointmentType: "type1",
        specialRequirements: "special",
        status: "Pending",
        notes: "notes",
      });

      booking.status = "active";
      await booking.save();

      return { newRegister, updatedBooking: booking };
    } catch (error) {
      console.error(error);
      throw error; // 更好的錯誤處理是拋出錯誤而不是僅僅返回它
    }
  },
};

module.exports = {
  query,
  command,
};
