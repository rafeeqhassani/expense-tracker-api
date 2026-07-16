function apiResponse(response, statusCode, data, message) {
  response.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

module.exports = apiResponse;
