import { Router } from "express";
const router = Router();

import ProductManager from '../manager/product.manager.js';

const productManager = new ProductManager('./src/data/products.json');


router.get('/', async(req, res)=>{
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
        res.status(500).json({msg: error.message})
    }
    

    
})

router.get('/:pid', (req, res)=>{

    const { id } = req.params;
    const prod = products.find(p => p.id === parseInt(id))
    if(!prod) res.status(404).json({msg: 'Product not found'})
    else res.status(200).json(prod)
})

router.post('/', (req, res)=>{
    products.push(req.body)
    res.json({msg: 'Producto agregado con éxito'})
})

router.post('/:pid', (req, res)=>{

    const { id } = req.params;
    const prod = products.find(p => p.id === parseInt(id))
    if(!prod) res.status(404).json({msg: 'Product not found'})
    else res.status(200).json(prod)
})

export default router;