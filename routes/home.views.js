const Router = require("express");
const ProductManager = require("../src/ProductManager");
const productManager = new ProductManager(`../db/productos.json`)
const homeRouter = Router()


homeRouter.get(`/`, async (req, res) => {
    const data = await productManager.getProducts()
    res.render(`home`, { data, style: `index.css` })
})


module.exports = homeRouter