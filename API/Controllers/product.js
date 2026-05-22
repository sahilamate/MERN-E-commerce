import { Products } from "../Models/Product.js";

export const addProduct = async (req, res) => {
    const {title, description, price, category, qty, imgSrc} = req.body 

    try {
        let product = await Products.create({
            title, 
            description, 
            price, 
            category, 
            qty, 
            imgSrc
        })
        res.json({message: "Product Added Successfully...!!!", product})
    } catch (error) {
        res.json(error.message)
    }
}

// get all product 
export const getProducts = async (req, res) => {
    let products = await Products.find().sort({createdAt: -1})
    res.json({message: "All Products", products})
}

export const getProductById = async (req, res) => {
    let id = req.params.id
    let product = await Products.findById(id)
    if(!product) return res.json({message: "Invalid Id"})
        res.json({message: "Specific Product", product})
}

export const updateProductById = async (req, res) => {
    let id = req.params.id 
    let product = await Products.findByIdAndUpdate(id, req.body, {new: true})
    if(!product) return res.json({message: "Invalide Id"})
        res.json({message: "Product updated successfully!!!", product})
}

export const deleteProductById = async (req, res) => {
    let id = req.params.id 
    let product = await Products.findByIdAndDelete(id)
    if(!product) return res.json({message: "Invalid Id"})
        res.json({message: "Product deleted successfully!!!"})
}