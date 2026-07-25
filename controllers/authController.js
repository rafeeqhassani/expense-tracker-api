const { createUser, findUserByEmail } = require("../db/queries/userQueries");
const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    passwordHash,
  });

  apiResponse(res, 201, user, "User registered successfully");
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  apiResponse(
    res,
    200,
    {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    "Login successful",
  );
};

module.exports = {
  registerController,
  loginController,
};
