const { db } = require("../lib/db");

const {
  ApiError
} = require("../lib/errors");

function sanitizeUser(user) {
  const {
    password,
    ...safeUser
  } = user;

  return safeUser;
}

async function getUsers() {
  const users =
    await db.get("/users");

  return users.map(
    sanitizeUser
  );
}

async function getUserById(id) {
  const user =
    await db.get(`/users/${id}`);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  return sanitizeUser(user);
}

module.exports = {
  getUsers,
  getUserById
};