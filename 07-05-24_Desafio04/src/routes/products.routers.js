import { Router } from "express";
const router = Router();
import { __dirname } from "../path.js";

import ProductManager from '../manager/product.manager.js';

const productManager = new ProductManager(`${__dirname}/data/products.json`);

import { productValidator  } from "../middlewares/productValidator.js";

router.get('/', async(req, res, next)=>{
    try {
        const products = await productManager.getProducts();
        res.json(products)
        const { limit } = req.query;
        if (limit) {
            const productsFilter = products.slice(0, parseInt, (limit));
            res.status(200).json(productsFilter);
        } else {
            res.status(200).json(products);
        }
        
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
    

    
})

router.get('/:pid', (req, res)=>{

    const { id } = req.params;
    const prod = products.find(p => p.id === parseInt(id))
    if(!prod) res.status(404).json({msg: 'Product not found'})
    else res.status(200).json(prod)
})

router.post('/', productValidator, async (req, res, next)=>{
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product)
        res.json(newProduct);
    } catch (error) {
        next(error)
    }
})

router.put('/:pid', async (req, res, next)=>{
    try {
        const { idProd } = req.params;
        const prodUpd = await productManager.updateProduct(req.body, idProd);
        if(!prodUpd) res.status(404).json({msg: 'Error updating product'})
        else res.status(200).json(prodUpd)
    } catch (error) {
        next(error)
    }
})

router.delete('/:pid', async (req, res, next)=>{
    try {
        const { idProd } = req.params;
        const delProd = await productManager.deleteProduct(idProd);
        if(!delProd) res.status(404).json({msg: 'Error deleting product'})
        else res.status(200).json({msg: `product id: ${idProd} deleted successfully`})
    } catch (error) {
        next(error)
    }
})

export default router;