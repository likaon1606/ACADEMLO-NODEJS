const express = require('express');

//Middlewares
const {  protectToken } = require('../middlewares/users.middlewares');
const {
    createProductValidations,
    checkValidations,
} = require('../middlewares/validations.middlewares');
const { productExists, protectProductOwner } = require('../middlewares/products.middlewares');

//Controllers
const { 
    getAllProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
 } = require('../controllers/productsController');


const router = express.Router();

router.get('/', getAllProducts);

//PROTECT TOKEN
router.use(protectToken);

router.post('/', createProductValidations, checkValidations, createProduct);

router.route('/:id')
.get(productExists, getProductsById)
.patch(productExists, protectProductOwner, updateProduct)
.delete(productExists, protectProductOwner, deleteProduct);



module.exports = { productsRouter: router };
