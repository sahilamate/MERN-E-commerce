import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
    const { cart, decreaseQty, removeProductFromCart,addToCart, clearCart } = useContext(AppContext)
    // console.log(cart)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let qty = 0
        let price = 0
        if (cart?.items) {
            for (let i = 0; i < cart.items?.length; i++) {
                qty += cart.items[i].qty
                price += cart.items[i].price
            }
        }
        setPrice(price)
        setQty(qty)
    })

    return (
        <>

            <div className="container-fluid py-5" style={{ background: "linear-gradient(135deg, #fceabb, #f8b500)" }}>
                {
                    cart?.items?.length == 0 ? (
                        <>
                        <div className='text-center my-5'>
                            <button onClick={() => navigate('/')} className="btn btn-outline-info rounded-pill px-4 fw-semibold">
                                Continue Shopping...
                            </button>
                            </div>
                        </>

                    )
                        :
                        <>
                            <div className="container">
                                <h2 className="mb-5 text-center fw-bold text-dark">🛒 Your Shopping Cart</h2>
                                <div className="d-flex gap-3 my-3 justify-content-center">
                                    <button className="btn btn-outline-info rounded-pill px-4 fw-semibold">
                                        Quantity: {qty}
                                    </button>
                                    <button className="btn btn-outline-success rounded-pill px-4 fw-semibold">
                                        Price: ₹ {price}
                                    </button>
                                </div>

                                <div className="row g-4">
                                    {cart?.items?.map((product) => (
                                        <div key={product._id} className="col-12">
                                            <div className="card shadow-lg border-0 rounded-4 p-3 d-flex flex-row align-items-center" style={{ backgroundColor: "#ffffff" }}>

                                                {/* Image */}
                                                <img
                                                    src={product.imgSrc}
                                                    alt={product.title}
                                                    className="rounded-3 border"
                                                    style={{ width: "120px", height: "100px", objectFit: "cover" }}
                                                />

                                                {/* Product Info */}
                                                <div className="ms-4 flex-grow-1">
                                                    <h5 className="mb-1 text-dark">{product.title}</h5>
                                                    <p className="mb-0 text-muted fw-semibold">₹ {product.price}</p>
                                                    <p className="mb-0 text-muted fw-semibold">Qty: {product.qty}</p>

                                                </div>

                                                {/* Buttons */}
                                                <div className="d-flex align-items-center gap-2">
                                                    <button className="btn btn-sm btn-warning rounded-pill px-3" onClick={() => decreaseQty(product.productId, 1)}>-</button>
                                                    <span className="fw-bold fs-5">{product.quantity}</span>
                                                    <button className="btn btn-sm btn-info rounded-pill px-3"
                                                        onClick={() => addToCart(product.productId, product.title, product.price / product.qty, 1, product.imgSrc)}
                                                    >+</button>
                                                    <button className="btn btn-sm btn-danger rounded-pill px-3"
                                                        onClick={() => {
                                                            if (confirm("Are you sure, want to remove from cart"))
                                                                removeProductFromCart(product?.productId)

                                                        }}>

                                                        Remove
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                }


                {
                    cart?.items?.length > 0 &&
                    <div className='container text-center my-5' style={{ fontWeight: "bold", fontSize: "20px" }}>

                        <button className='btn btn-info mx-3' style={{ fontWeight: "bold", fontSize: "20px" }} onClick={() => navigate("/shipping")}>Check Out</button>
                        <button className='btn btn-danger mx-3'
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                            onClick={() => {
                                if (confirm("Are you sure, want to clear cart"))

                                    clearCart()
                            }}>
                            Clear Cart
                        </button>
                    </div>

                }


            </div>
        </>
    )
}

export default Cart
