const AppError = require("../utils/AppError");

function validateAuth(req, res, next) {
  const { name, password } = req.body;

  const email = req.body.email?.trim().toLowerCase();

  if (req.path.includes("register") && !name?.trim()) {
    return next(new AppError("Name is required", 400));
  }

  if (req.path.includes("register") && !isNaN(Number(name))) {
    return next(new AppError("Name cannot be a number", 400));
  }

  if (!email?.trim()) {
    return next(new AppError("Email is required", 400));
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  if (!password || password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }
  req.body.email = email;

  next();
}

module.exports = validateAuth;
