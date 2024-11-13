const userServices = require("../../../../lib/user");

const changePassword = async (req, res, next) => {
  try {
    const { id, password, passwordConfirmation } = req.body;
    const response = await userServices.changePassword({
      id,
      password,
      passwordConfirmation,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = changePassword;
