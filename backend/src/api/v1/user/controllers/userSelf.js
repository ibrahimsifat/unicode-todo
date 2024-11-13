const userServices = require("../../../../lib/user");
const { authenticationError } = require("../../../../lib/utils/error");

const userSelf = async (req, res, next) => {
  // const { id } = req.user;
  const { populate } = req.query || "";
  // Check if the user is authenticated
  try {
    if (!req.user) {
      throw authenticationError("Unauthorized");
    }
    const user = await userServices.userSelf({ id: req.user.id, populate });
    const { id: userId } = user;
    const response = {
      id: userId,
      data: user,
      links: {
        self: `/users/${userId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = userSelf;
