const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authentication required", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError("Invalid authorization format", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      throw new AppError("Invalid token payload", 401);
    }
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    next(new AppError("Invalid or expired token", 401));
  }
}

module.exports = authMiddleware;
