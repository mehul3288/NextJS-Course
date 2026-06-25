const {
  ApiError
} = require("../lib/errors");

function admin(
  req,
  res,
  next
) {
  if (
    req.user.role !== "admin"
  ) {
    return next(
      new ApiError(
        403,
        "Access denied"
      )
    );
  }

  next();
}

module.exports = admin;