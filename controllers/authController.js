const { createUser, findUserByEmail } = require("../db/queries/userQueries");

const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 8d3b2f7a-xxxx
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john@example.com
 *       409:
 *         description: Email already registered
 */

const registerController = async (req, res) => {
  const name = req.body.name?.trim();
  const password = req.body.password;
  const email = req.body.email?.trim().toLowerCase();

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

  return apiResponse(
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 8d3b2f7a-xxxx
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john@example.com
 *       401:
 *         description: Invalid email or password
 */

const loginController = async (req, res) => {
  const { password } = req.body;

  const email = req.body.email?.trim().toLowerCase();

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  return apiResponse(
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

  return apiResponse(
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
