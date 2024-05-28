import express from "express";
import productRouter from "./routes/products.routers.js"
import cartRouter from "./routes/cart.routers.js"
import morgan from 'morgan';
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./path.js";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(morgan('dev'))

app.use(express.static(__dirname + 'public'))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views")

app.get('/', (req, res) => {
    res.render('RealTimeProducts.handlebars')
})

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)

app.use(errorHandler); 

const PORT = 8080

const httpServer = app.listen(PORT, ()=>console.log(`Server ok on port ${PORT}`))

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket)=> {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', ()=>{ 
        console.log('Usuario desconectado')
    })
})