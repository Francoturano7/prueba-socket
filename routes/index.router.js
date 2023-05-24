const Router =require ("express");
const  cartsRouter= require ("./cart.routes.js");
const  productRouter= require ( "./product.routes.js");

const indexRouter = Router()
 
indexRouter.use("/carts", cartsRouter)
indexRouter.use("/products", productRouter)

module.exports=indexRouter