const userService = require(
  "../services/user.service"
);

async function getUsers(
  req,
  res,
  next
) {
  try {
    const users =
      await userService.getUsers();

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(
  req,
  res,
  next
) {
  try {
    const user =
      await userService.getUserById(
        req.params.id
      );

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById
};