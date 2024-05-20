import express from "express";
import productRouter from "./routes/products.routers"
import cartRouter from "./routes/cart.routers"
import morgan from 'morgan';
import { errorHandler } from "./middlewares/errorHandler";
import { __dirname } from "./path";

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(morgan('dev'))

app.use(express.static(__dirname + 'public'))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)

app.use(errorHandler); 

const PORT = 8080

app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))