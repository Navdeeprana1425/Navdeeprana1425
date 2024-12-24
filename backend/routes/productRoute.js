import express from 'express'
const router = express.Router()
import { getAllProducts,createProduct,getSingleProduct,updateProduct, deleteProduct} from "../controllers/productController.js";
import isAuthenticUser from '../middleware/auth.js';

//Create
router.post('/products/new',isAuthenticUser,createProduct);

//Read
router.get('/products',getAllProducts);
router.get('/product/:id',getSingleProduct)


//Update
router.put('/product/:id',isAuthenticUser,updateProduct)

//delete
router.delete('/product/:id',isAuthenticUser,deleteProduct)

export default router

