class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(title,description,price,thumbnail,code,stock){
        const codeExists = this.#getProductByCode(code);

        if (codeExists) {
            console.log("A product with that code already exists!");
            return false;
        }
        else if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields are required");
            return false;
        }else{
        const product = {
            id: this.#getIdMax() + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);
    }
    }
    
    
    #getProductByCode(productCode) {
        return this.products.find(product => product.code === productCode);
    }

    #getIdMax() {
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    getProducts(){
        return this.products;
    }

    getProductById(productId){
        let product = this.products.find((product) => product.id == productId);
        if(product) {   return product; 
        }  else{   return'Not found';   }
    }
}

const productManager = new ProductManager();
productManager.addProduct('Mouse Logitech G Pro X', '25600dpi, sensor optico', 100000, 'https://i0.wp.com/uranostream.com/wp-content/uploads/2024/02/40419_1-jpeg.webp?fit=900%2C900&ssl=1', 1, 6);
productManager.addProduct('Teclado Kumara Redragon', 'Technicless RGB', 80000, 'https://http2.mlstatic.com/D_NQ_NP_652418-MLU72836481129_112023-O.webp', 2, 5);

console.log(productManager.getProducts())
console.log(productManager.getProductById(1))