const auth = require("./auth");
const user = require("./user");
//const user= favorite("./favorite"); why does it crash when i add a favorite page? is it bc nothing is in it?
const charity = require("./charity");

module.exports = {
  auth,
  user,
  charity
};
