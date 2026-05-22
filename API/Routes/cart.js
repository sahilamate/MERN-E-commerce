import express from "express"
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js"
import { Authenticated } from "../Middeleware/auth.js"

const router = express.Router()

// add to cart 
router.post("/add", Authenticated, addToCart)

// ger user cart
router.get("/user", Authenticated, userCart)

// remove cart 
router.delete("/remove/:productId", Authenticated, removeProductFromCart)

// clear cart 
router.delete("/clear", Authenticated, clearCart)

// decrease item quantity 
router.post("/--qty", Authenticated, decreaseProductQty)

export default router


