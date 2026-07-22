const { getAllCategories } = require("../db/queries/categoryQueries");
const apiResponse = require("../utils/apiResponse");

async function getCategoriesController(req, res) {
  const categories = await getAllCategories();

  apiResponse(res, 200, categories);
}

module.exports = {
  getCategoriesController,
};
