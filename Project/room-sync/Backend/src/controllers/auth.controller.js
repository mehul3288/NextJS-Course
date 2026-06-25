const authService =
  require("../services/auth.service");

async function register(
  req,
  res,
  next
) {
  try {
    const result =
      await authService.register(
        req.body
      );

    res.status(201).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
}

async function login(
  req,
  res,
  next
) {
  try {
    const result =
      await authService.login(
        req.body
      );

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
}

async function me(
  req,
  res,
  next
) {
  try {
    const user =
      await authService.getCurrentUser(
        req.user.userId
      );

    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me
};