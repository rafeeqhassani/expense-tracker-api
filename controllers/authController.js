const { createUser, findUserByEmail } = require("../db/queries/userQueries");
const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

const registerController = async (req, res) => {
  const name = req.body.name.trim();
  const { email, password } = req.body;

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

  const token = generateToken(user);

  apiResponse(
    res,
    201,
    {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    "User registered successfully",
  );
};

const loginController = async (req, res) => {
  const { password } = req.body;

  const email = req.body.email.trim().toLowerCase();

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

const demoController = async (req, res) => {
  const user = await findUserByEmail("demo@expense.com");

  if (!user) {
    throw new AppError("Demo account not found", 404);
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
    "Demo login successful",
  );
};

module.exports = {
  registerController,
  loginController,
  demoController,
};
