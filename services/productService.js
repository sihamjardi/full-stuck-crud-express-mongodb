const Product = require('../models/product');

exports.createProduct = data => new Product(data).save();

exports.getAllProducts = async (options = {}) => {
  const page = +options.page || 1;
  const limit = +options.limit || 6;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();

  return {
    products,
    pagination: {
      page,
      totalPages: Math.ceil(total / limit)
    }
  };
};

exports.getProductById = id => Product.findById(id);

exports.updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteProduct = id => Product.findByIdAndDelete(id);
