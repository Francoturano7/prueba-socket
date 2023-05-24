const Router =require ("express");
const ProductManager =require ('../src/ProductManager');
const productManager= new ProductManager()
const realTimeRouter= Router()

realTimeRouter.get(`/`,async (req,res)=>{
    try {
        const data = await productManager.getProducts()
        res.status(200).render(`realTimeProducts`,{data,style:`index.css`})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error:`Could not get the product list`
        })
    }
})

module.exports=realTimeRouter