const express = require('express');
const service = require('../../services/productService');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await service.getAllProducts(req.query));
});

router.post('/', async (req, res) => {
  res.status(201).json(await service.createProduct(req.body));
});

router.get('/:id', async (req, res) => {
  res.json(await service.getProductById(req.params.id));
});

router.put('/:id', async (req, res) => {
  res.json(await service.updateProduct(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
  await service.deleteProduct(req.params.id);
  res.json({ message: 'Supprimé' });
});

module.exports = router;
