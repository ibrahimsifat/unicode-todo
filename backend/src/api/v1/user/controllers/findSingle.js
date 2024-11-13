const userServices = require("../../../../lib/user");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const user = await userServices.findSingle({ id, populate });
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

module.exports = findSingle;
