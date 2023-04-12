// JSON server as placeholder for back-end API

// Terminal command: npx json-server --watch db/index.js --port 3001
// Resources
// http://localhost:3001/adminSeatDetails
// http://localhost:3001/appConfig
// http://localhost:3001/registerUser
// http://localhost:3001/verifyOtp

const adminSeatDetails = require("./adminSeatDetails.json");
const appConfig = require("./appConfig.json");
const registerUser = require("./registerUser.json");
const verifyOtp = require("./verifyOtp.json");
const transactionDetail = require("./transactionDetail.json");

module.exports = () => ({
  adminSeatDetails: adminSeatDetails,
  appConfig: appConfig,
  registerUser: registerUser,
  verifyOtp: verifyOtp,
  transactionDetail: transactionDetail
});
