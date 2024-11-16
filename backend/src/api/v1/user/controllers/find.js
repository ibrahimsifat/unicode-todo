const userService = require("../../../../lib/user");
/**
 * Get users for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const findUsers = async (req, res, next) => {
  try {
    const users = await userService.find();
    const totalCount = users.length;

    res.status(200).json({
      message: "Users successfully fetched",
      totalCount,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findUsers;
