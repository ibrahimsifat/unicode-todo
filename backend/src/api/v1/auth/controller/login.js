const authService = require("../../../../lib/auth");

const localLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = await authService.login(email, password);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = localLogin;
