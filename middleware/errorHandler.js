const postgresErrors = {
  23505: { status: 409, message: "Resource already exists" },
  23503: { status: 400, message: "Related resource does not exist" },
  23514: { status: 400, message: "Invalid data" },
  23502: { status: 400, message: "Required field is missing" },
};

function errorHandler(error, request, response, next) {
  console.error({
    message: error.message,
    code: error.code,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });

  const postgresError = postgresErrors[error.code];

  if (postgresError) {
    return response.status(postgresError.status).json({
      success: false,
      data: null,
      message: postgresError.message,
    });
  }

  const statusCode = error.statusCode || 500;

  const message = statusCode === 500 ? "Internal server error" : error.message;

  return response.status(statusCode).json({
    success: false,
    data: null,
    message,
  });
}

module.exports = errorHandler;
