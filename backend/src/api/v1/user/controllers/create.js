const userServices = require("../../../../lib/user");
/**
 * Create a new User.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await userServices.create({
      name,
      email,
      password,
    });
    const { id: userId } = user;
    const response = {
      code: 201,
      message: "User Created Successfully",
      data: user,
      links: {
        self: `/users/${userId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
