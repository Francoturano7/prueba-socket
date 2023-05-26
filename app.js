//Create Server
const express = require(`express`)
const app = express()
const path = require("path")

const http = require(`http`)
const server = http.createServer(app)

const handlebars = require(`express-handlebars`)

const homeRouter = require(`./routes/home.views.js`)
const indexRouter = require(`./routes/index.router.js`)
const realTimeRouter = require("./routes/realTimeProducts.views")
const ProductManager = require("./src/ProductManager")


const { Server } = require(`socket.io`)
const io = new Server(server)

const productManager = new ProductManager(`./db/productos.json`)

const PORT = 8080 || process.env.PORT

server.listen(PORT, () => {
    console.log(`escuchando puerto 8080`)
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.static(__dirname + `/public`))

app.use(`/api`, indexRouter)

app.use(`/`, homeRouter)
app.use(`/realtimeproducts`, realTimeRouter)


//Socket
io.on(`connection`, async (socket) => {
    console.log(`New User Conected`)


    socket.on(`addProduct`, async (data) => {
        const added = await productManager.addProduct(data)
        io.sockets.emit(`allProducts`, await productManager.getProducts())
    })
})

app.get(`*`, (req, res) => {
    res.status(404).json({ status: `error`, msg: `Path not found` })
})
