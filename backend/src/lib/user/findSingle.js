const { User } = require("../../models");
const { notFound } = require("../utils/error");
const getUserDTO = require("../utils/getUserDTO");

/**
 * Find a single user based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the user to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The user data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  let user = await User.findById(id);
  if (!user) {
    throw notFound("User Not Found");
  }
  const getUser = getUserDTO(user);
  return getUser;
};

module.exports = findSingle;
