function errorHandler(error, request, response, next) {
  console.error(error);

  response.status(error.statusCode || 500).json({
    success: false,
    data: null,
    message: error.message || "Internal server error",
  });
}

module.exports = errorHandler;
