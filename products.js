import express from 'express'
import bodyParser from 'bodyparser'
import productsRoute from './routes/products.js'

const router = express.Router();
const products = (request, response) => {
    response.send('products');
}
router.length('/', products)    //localhost:3000/products/
export default router