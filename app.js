const express = require('express');
const path = require('path');
const session = require('express-session');
require('./db/mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'crud_secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/products', require('./routes/productRoutes'));

app.use('/api/products', require('./routes/api/productRoutes'));

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.listen(3000, () =>
  console.log('Serveur lancé : http://localhost:3000')
);
