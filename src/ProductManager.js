const fs = require(`fs`);
const uuid4 = require("uuid4");

class ProductManager {
    constructor() {
        this.path = "./db/productos.json";
        this.products = [];
    }

    static id = uuid4()


    async addProduct(product) {
        try {
            console.log("producto", product);
            let products = await this.getProducts()
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category) {
                return "Error: Todos los campos son obligatorios.";
            }
            if (products.some(p => p.code === product.code)) {
                return "Error: El código debe ser único.";
            }
            const newProduct = { ...product, id: uuid4() };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return `Producto agregado con id: ${newProduct.id}`;
        } catch (error) {
            console.log(error)
        }
    }

    getProducts = async () => {
        try {
            let respuesta = await fs.promises.readFile(this.path, `utf-8`);
            return JSON.parse(respuesta);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log(error);
                return []
            } else {
                throw err;
            }
        }
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.getProducts();
        if (!respuesta3.find((product) => product.id === id)) {
            return 'Product Not Found'
        } else {
            let productFound = respuesta3.find((product) => product.id === id)
            return productFound
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.getProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, 2));
        return `Producto Eliminado con el id: ${id}`
    }

    updateProducts = async (id, { ...product }) => {
        await this.deleteProductsById(id);
        let productOld = await this.getProducts();
        let productsModif = [{ ...product, id }, ...productOld];
        await fs.promises.writeFile(this.path, JSON.stringify(productsModif, null, 2))
        return `Producto Actualizado con exito`
    }
}

module.exports = ProductManager