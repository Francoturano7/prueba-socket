const fs = require(`fs`);
const uuid4 = require("uuid4");
const ProductManager = require("./ProductManager");

let allProducts = new ProductManager(`./db/productos.json`)

class CartManager {
    constructor() {
        this.path = "./db/carrito.json";
        this.cart = []
    }

    static id = uuid4()

    async addCart() {
        try {
            let cartsOld = await this.getCarts()
            let id = uuid4()
            const cartsConcat = [{ id: id, products: [] }, ...cartsOld]
            let carritoAgregado = await fs.promises.writeFile(this.path, JSON.stringify(cartsConcat, null, 2));
            return carritoAgregado;
        } catch (error) {
            return error
        }
    }

    getCarts = async () => {
        try {
            let respuesta = await fs.promises.readFile(this.path, `utf-8`);
            let allCart = JSON.parse(respuesta);
            return allCart
        } catch (error) {
            if (error.code === "ENOENT") {
                return []
            } else {
                throw err;
            }
        }
    };

    getCartsById = async (id) => {
        let respuesta3 = await this.getCarts();
        if (!respuesta3.find((cart) => cart.id === id)) {
            return 'Cart Not Found'
        } else {
            return respuesta3.find((cart) => cart.id === id)
        }
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.getCartsById(cartId)
        let productById = await allProducts.getProductsById(productId)
        let allCarts = await this.getCarts()
        await allCarts.filter(cart => cart.id != cartId)
        if (cartById !== 'Cart Not Found') {
            if (productById !== "Product Not Found") {
                let productIndex = cartById.products.findIndex(prod => prod.id == productId)
                if (productIndex !== -1) {
                    cartById.products[productIndex].quantity++
                    let cartIndex = allCarts.findIndex(cart => cart.id == cartId)
                    allCarts[cartIndex] = cartById
                    await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
                    return cartById;
                } else {
                    cartById.products.push({ id: productId, quantity: 1 })
                    let cartIndex = allCarts.findIndex(cart => cart.id == cartId)
                    allCarts[cartIndex] = cartById
                    await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
                    return cartById;
                }
            } else {
                return "Ese producto no existe"
            }
        }
        else {
            return "no existe ese carrito"
        }
    }
}



module.exports = CartManager


