function validateExpense(request, response, next) {
  const { title, amount, category, date } = request.body;

  if (!title || !isNaN(title.trim()) === "") {
    return response.status(400).json({
      message: "Title is required",
    });
  }

  if (!isNaN(title)) {
    return response.status(400).json({
      message: "Title cannot be a number",
    });
  }

  if (amount === undefined || amount === null || amount === "") {
    return response.status(400).json({
      message: "Amount is required",
    });
  }

  if (isNaN(Number(amount))) {
    return response.status(400).json({
      message: "Amount must be a number",
    });
  }

  if (Number(amount) <= 0) {
    return response.status(400).json({
      message: "Amount must be positive",
    });
  }

  if (!category || !isNaN(category.trim()) === "") {
    return response.status(400).json({
      message: "Category is required",
    });
  }

  if (!isNaN(category)) {
    return response.status(400).json({
      message: "Category cannot be a number",
    });
  }

  if (!date) {
    return response.status(400).json({
      message: "Date is required",
    });
  }

  if (isNaN(Date.parse(date))) {
    return response.status(400).json({
      message: "Invalid date",
    });
  }

  next();
}

module.exports = validateExpense;
