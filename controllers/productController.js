const mongoose = require('mongoose');
const service = require('../services/productService');

exports.getAllProducts = async (req, res) => {
  const data = await service.getAllProducts(req.query);
  res.render('products/index', { title: 'Produits', ...data });
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  // Vérification ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render('error', {
      message: 'Ressource introuvable'
    });
  }

  const product = await service.getProductById(id);
  if (!product) {
    return res.render('error', { message: 'Produit introuvable' });
  }

  res.render('products/details', { title: product.name, product });
};

exports.showCreateForm = (req, res) => {
  res.render('products/create', { title: 'Ajouter' });
};

exports.createProduct = async (req, res) => {
  await service.createProduct(req.body);
  res.redirect('/products');
};

exports.showEditForm = async (req, res) => {
  const product = await service.getProductById(req.params.id);
  res.render('products/edit', { title: 'Modifier', product });
};

exports.updateProduct = async (req, res) => {
  await service.updateProduct(req.params.id, req.body);
  res.redirect('/products');
};

exports.deleteProduct = async (req, res) => {
  await service.deleteProduct(req.params.id);
  res.redirect('/products');
};
