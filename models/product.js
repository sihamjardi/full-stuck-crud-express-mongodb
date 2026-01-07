const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  price: { type: Number, required: true, min: 0 },
  description: String,
  category: {
    type: String,
    enum: ['Électronique', 'Vêtements', 'Alimentation', 'Livres', 'Autres'],
    default: 'Autres'
  },
  quantity: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  tags: [String],
  imageUrl: { type: String, default: 'default.jpg' }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.quantity === 0) this.inStock = false;
  next();
});

module.exports = mongoose.model('Product', productSchema);
