const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

router.get('/', controller.getAllProducts);
router.get('/create', controller.showCreateForm);
router.post('/create', controller.createProduct);
router.get('/edit/:id', controller.showEditForm);
router.post('/:id/update', controller.updateProduct);
router.post('/:id/delete', controller.deleteProduct);
router.get('/:id', controller.getProductById);

module.exports = router;
