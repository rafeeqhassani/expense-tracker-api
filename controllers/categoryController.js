const { getAllCategories } = require("../db/queries/categoryQueries");
const apiResponse = require("../utils/apiResponse");

async function getCategoriesController(request, response) {
  const categories = await getAllCategories();

  apiResponse(response, 200, categories);
}

module.exports = {
  getCategoriesController,
};
