const { User } = require("../../models");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
const findLoginUser = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
const findUserByIdPopulateRole = async (id) => {
  const user = await User.findById(id).populate({
    path: "role",
    populate: [{ path: "permissions" }],
  });
  return user;
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);
  return user;
};

const createUser = async (userObj) => {
  const user = new User(userObj);
  await user.save();
  return { ...user._doc, id: user.id };
};

const updatePassword = async ({ email, newPassword }) => {
  await User.findOneAndUpdate({ email }, { password: newPassword });
  return true;
};

module.exports = {
  findUserByEmail,
  findUserByIdPopulateRole,
  findUserById,
  userExist,
  createUser,
  updatePassword,
  findLoginUser,
};
