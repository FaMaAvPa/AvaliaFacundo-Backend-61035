import express from 'express';
import { products } from './products.js'

const server = express()

server.get('/products', (req, res)=>{
    res.json(products)

    const { limit } = req.query;
    const productsFilter = products.filter()
})

server.get('/products/:id', (req, res)=>{

    const { id } = req.params;
    const prod = products.find(p => p.id === parseInt(id))
    if(!prod) res.json({msg: 'Product not found'})
    else res.json(prod)
})

const PORT = 8080

server.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`))