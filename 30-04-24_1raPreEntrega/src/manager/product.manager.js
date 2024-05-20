import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager {
    constructor(path){
        this.path = path
        this.products
    }

    async addProduct(obj){
        try{
            const products = await this.getProducts()
        const product = {
            id: uuidv4(),
            status: true,
           ...obj
        };
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return product;
        }
        catch (error) {
            console.log(error)
        }        
    }
    
    
    async #getProductByCode(productCode) {
        const products = await this.getProducts()
        return products.find(product => product.code === productCode);
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else return [];
        }catch (error) {
            console.log(error);
        }
    }

    async getProductById(productId){
        try{
            const products = await this.getProducts()
            let product = products.find((product) => product.id == productId);
            if(product) {   return product; }  
            else{   return'Product not found';   }
        }catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(productId){
        try{
            const products = await this.getProducts()
            let productTest = products.find(product => product.id == productId);
            let product = products.findIndex((product) => product.id == productId);
            if(productTest) { 
                 products.splice(product, 1) 
                 await fs.promises.writeFile(this.path, JSON.stringify(products))
                }  
            else{   return'Product not found';   }

        }catch (error) {
            console.log(error)
        }
    }

    async updateProduct(productId, newProduct){
        try{
            const products = await this.getProducts()
            let productTest = products.find(product => product.id == productId);
            let product = products.findIndex(product => product.id == productId);
            if(productTest) { 
                const productEdited = {
                    id: productId,
                    ...newProduct
                }
                 products.splice(product, 1, productEdited) 
                 await fs.promises.writeFile(this.path, JSON.stringify(products))
                }  
            else{   return'Product not found';   }

        }catch (error) {
            console.log(error)
        }
    }
}