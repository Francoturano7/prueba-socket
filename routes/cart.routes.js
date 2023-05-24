const Router =require ("express");
 const cartsRouter = Router()


const CartManager= require (`../src/CartManager`) ;

const cart = new CartManager(`../db/carrito.json`)


cartsRouter.get(`/`, async (req, res) => {
    res.send(await cart.getCarts())
})

cartsRouter.post(`/`, async (req, res) => {
    res.send(await cart.addCart())
})

cartsRouter.get(`/:cid`, async (req, res) => {
    let id = req.params.cid
    res.send(await cart.getCartsById(id))
})

cartsRouter.post(`/:cid/products/:pid`, async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await cart.addProductInCart(cartId, productId))
})

module.exports=cartsRouter

