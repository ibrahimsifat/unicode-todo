const { User } = require("../../models");
const { getUserDTO } = require("../../lib/utils");
const { badRequest } = require("../../lib/utils/error");
const { userExist } = require("./utils");

/**
 * Create a new user.
 *
 * @param {Object} userData - Data to create a new user.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @returns {Object} - The newly created user with additional properties (id).
 */

const create = async ({ name, email, password, avatar }) => {
  const checkIsExist = await userExist(email);
  if (checkIsExist) {
    throw badRequest("User already exist");
  }
  const userData = {
    name,
    email,
    password,
    avatar,
  };
  const newUser = await User.create({ ...userData });
  const result = getUserDTO(newUser);
  return { id: newUser.id, code: 201, ...result };
};

module.exports = create;
