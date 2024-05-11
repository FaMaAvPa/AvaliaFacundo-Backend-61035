import express from 'express';
import ProductManager from './product.manager.js';

const productManager = new ProductManager('./products.json');

const server = express()

server.get('/products', async(req, res)=>{
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

server.get('/products/:id', (req, res)=>{

    const { id } = req.params;
    const prod = products.find(p => p.id === parseInt(id))
    if(!prod) res.status(404).json({msg: 'Product not found'})
    else res.status(200).json(prod)
})

const PORT = 8080

server.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`))