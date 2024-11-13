const getUserDTO = (user) => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports = getUserDTO;
