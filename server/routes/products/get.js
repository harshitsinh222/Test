const { invalid } = require("joi");
const joi = require("joi");
const { model } = require("mongoose");
const Product = require("../../models/product");

/**
 * @api GET /api/products
 * @description Get all products
 */
module.exports = async function (req, res) {
  try {
    const term = req.query.search;
    let query = {};
    if (term) {
      query.name = term;
    }
    var perPage = req.query.perPage;
    var page = req.query.page;

    const products = await Product.find(query)
      .sort({
        name: 1,
        price: 1,
        quantity: 1,
        createdAt: -1,
      })
      .limit(perPage)
      .skip(page * perPage);
    return res.json({ products });
  } catch (error) {
    console.error("Error in getting products", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in getting products" });
  }
};
