const Router =require ("express");
const ProductManager =require ('../src/ProductManager');
 const productRouter = Router()

const productManager = new ProductManager(`../db/productos.json`)


productRouter.get(`/`, async (req, res) => {
    res.send(await productManager.getProducts())
})

productRouter.get(`/:pid`, async (req, res) => {
    let id = req.params.pid
    res.send(await product.getProductsById(id))
})

productRouter.post(`/`, async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProduct(newProduct))
})

productRouter.put(`/:pid`, async (req, res) => {
    let id = req.params.pid
    let infoNew = req.body
    res.send(await product.updateProducts(id, infoNew))
})

productRouter.delete(`/:pid`, async (req, res) => {
    let id = req.params.pid
    res.send(await product.deleteProductsById(id))
})

module.exports=productRouter