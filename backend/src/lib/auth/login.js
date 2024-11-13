const bcrypt = require("bcryptjs");
const { badRequest, notFound } = require("../utils/error");
const getUserTokenPayload = require("../utils/getUserDTO");
const { generateToken } = require("../utils/token");
const { findLoginUser } = require("../user/utils");
const getUserDTO = require("../utils/getUserDTO");

const localLogin = async (email, password) => {
  try {
    const user = await findLoginUser(email);
    if (!user) {
      throw notFound("User not found.");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw badRequest("Invalid credentials. wrong password ");
    }
    // Generate JWT token
    const payload = getUserTokenPayload(user._doc);
    const token = generateToken({ payload });
    const getUser = getUserDTO(user._doc);
    console.log("token", token);
    const userData = {
      message: "success",
      accessToken: token,
      user: getUser,
    };
    // console.log("userData", userData);
    return userData;
  } catch (error) {
    throw badRequest(error.message);
  }
};
module.exports = localLogin;
