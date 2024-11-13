// const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { User } = require("../../models");
// const {
//   getSinglePopulatedFields,
// } = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../lib/utils/error");
const { getUserDTO } = require("../utils");

/**
 * Find a single user based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the user to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The user data with populated fields if requested.
 */
const userSelf = async ({ id, populate }) => {
  // const populatedFields = parsePopulatedFields(populate);
  let user = await User.findById(id);
  if (!user) {
    throw notFound("User not Found");
  }

  // Apply population
  // if (populatedFields.length > 0) {
  //   user = await getSinglePopulatedFields(user, populatedFields);
  //   // user = await user.populate(populatedFields.join(" "));
  // }
  const userDTO = getUserDTO(user);
  return userDTO;
};

module.exports = userSelf;
