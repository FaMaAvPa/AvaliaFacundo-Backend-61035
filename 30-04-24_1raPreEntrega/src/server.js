import express from "express";
import userRouter from "./routes/products.routers"
import cartRouter from "./routes/cart.routers"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + 'public'))

app.use('/user', userRouter);
app.use('/cart', cartRouter)


const PORT = 8080

app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))