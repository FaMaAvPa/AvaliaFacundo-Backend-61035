const { log } = require('console');
const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
        this.products
    }

    async addProduct(title,description,price,thumbnail,code,stock){
        try{
            const products = await this.getProducts()

            const codeExists = await this.#getProductByCode(code);

        if (codeExists) {
            console.log("A product with that code already exists!");
            return false;
        }
        else if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields are required");
            return false;
        }else{
        const product = {
            id: await this.#getIdMax() + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

        }catch (error) {
            console.log(error)
        }        
    }
    
    
    async #getProductByCode(productCode) {
        const products = await this.getProducts()
        return products.find(product => product.code === productCode);
    }

    async #getIdMax() {
        const products = await this.getProducts()
        let maxId = 0;
        products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
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

const productManager = new ProductManager('./products.json');

const test = async() => {
    console.log(await productManager.getProducts());
    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    await productManager.addProduct('producto prueba2', 'Este es un producto prueba2', 300, 'Sin imagen', 'abc1234', 30);
    console.log(await productManager.getProducts());
    console.log(await productManager.getProductById(1))
    console.log(await productManager.getProductById(3))

    const productEdit = {
        title: 'producto prueba editado',
        description: 'Este es un producto de prueba editado',
        price: 150,
        thumbnail: 'Sin imagen',
        code: 'abcd12345',
        stock: 50
    }

    console.log(await productManager.updateProduct(1, productEdit));
    console.log(await productManager.getProducts());
    console.log(await productManager.deleteProduct(1));
    console.log(await productManager.getProducts());
    console.log(await productManager.deleteProduct(4));
}

test()