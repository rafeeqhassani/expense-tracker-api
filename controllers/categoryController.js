const { getAllCategories } = require("../db/queries/categoryQueries");
const apiResponse = require("../utils/apiResponse");

async function getCategoriesController(request, response) {
  const userId = request.user.id;
  const categories = await getAllCategories(userId);

  apiResponse(response, 200, categories);
}

module.exports = {
  getCategoriesController,
};
