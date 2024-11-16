const { User } = require("../../models");
const { getUserDTO } = require("../utils");

// get all users
const find = async () => {
  const users = await User.find();
  return users;
};

module.exports = find;
