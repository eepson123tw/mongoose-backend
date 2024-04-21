const express = require("express");
const app = express();
const port = 3001;
const { connectMongo, closeMongo } = require("./functions/conntect-mongo");
const dashboardRouterApi = require("./routers/router.api");

const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // If the client sends an OPTIONS request, respond with a 200 status without calling next middleware
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

connectMongo("BookingSystem")
  .then((msg) => {
    console.log(msg);
    app.use(express.json());
    app.use(cors);
    app.use("/api", dashboardRouterApi);

    app.listen(port, () =>
      console.log(`服務啟動 on port ${port} http://localhost:${port}`)
    );
  })
  .catch((error) => console.error(error));

// 程序關閉或退出時，關閉資料庫連接
process.on("SIGINT", closeMongo);
// 處理異常退出時，關閉資料庫連接
process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  await closeMongo();
});
