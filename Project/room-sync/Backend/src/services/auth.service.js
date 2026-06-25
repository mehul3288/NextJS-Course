const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

const { db } = require("../lib/db");
const { ApiError } = require("../lib/errors");
const { generateToken } = require("../lib/jwt");

async function register(userData) {
  const {
    name,
    email,
    employeeId,
    password
  } = userData;

  if (
    !name ||
    !email ||
    !employeeId ||
    !password
  ) {
    throw new ApiError(
      400,
      "All fields are required"
    );
  }

  const existingUsers =
    await db.get(
      `/users?email=${encodeURIComponent(
        email
      )}`
    );

  if (existingUsers.length) {
    throw new ApiError(
      400,
      "Email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const newUser = {
    id: uuid(),
    name,
    email,
    employeeId,
    password: hashedPassword,
    role: "user"
  };

  const createdUser =
    await db.post(
      "/users",
      newUser
    );

  // const token =
  //   generateToken(createdUser);

  return {
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      employeeId:
        createdUser.employeeId,
      role: createdUser.role
    }
  };
}

async function login(data) {
  const { email, password } =
    data;

  const users =
    await db.get(
      `/users?email=${encodeURIComponent(
        email
      )}`
    );

  const user = users[0];

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isValid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isValid) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const token =
    generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      employeeId:
        user.employeeId,
      role: user.role
    }
  };
}

async function getCurrentUser(
  userId
) {
  const user =
    await db.get(
      `/users/${userId}`
    );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    employeeId:
      user.employeeId,
    role: user.role
  };
}

module.exports = {
  register,
  login,
  getCurrentUser
};