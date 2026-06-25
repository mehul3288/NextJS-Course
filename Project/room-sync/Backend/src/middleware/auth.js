const {
  verifyToken
} = require("../lib/jwt");

const {
  ApiError
} = require("../lib/errors");

async function auth(
  req,
  res,
  next
) {
  try {
    console.log(req.headers);
    
    const authHeader =
      req.headers.authorization;
    console.log(authHeader);
    
    if (!authHeader) {
      throw new ApiError(
        401,
        "Unauthorized"
      );
    }

    const token =
      authHeader.split(" ")[1];

    const payload =
      verifyToken(token);

    req.user = payload;

    next();
  } catch {
    next(
      new ApiError(
        401,
        "Invalid token"
      )
    );
  }
}

module.exports = auth;