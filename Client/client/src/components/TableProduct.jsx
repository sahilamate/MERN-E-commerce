import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const TableProduct = ({ cart }) => {
    const { decreaseQty, removeProductFromCart,addToCart, clearCart } = useContext(AppContext)
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

            <table className="table table-hover table-bordered align-middle shadow-sm">
                <thead className="table-dark text-center">
                    <tr>
                        <th scope="col">Product Img</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Qty --</th>
                        <th scope="col">Qty ++</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {cart?.items?.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <img
                                    src={product.imgSrc}
                                    alt={product.title}
                                    className="img-thumbnail"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                            </td>
                            <td className="fw-semibold">{product.title}</td>
                            <td className="text-success fw-bold">₹ {product.price}</td>
                            <td>{product.qty}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => decreaseQty(product.productId, 1)}>-</button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-success" onClick={() => addToCart(product.productId, product.title, product.price / product.qty, 1, product.imgSrc)}>+</button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-dark" onClick={() => {
                                                            if (confirm("Are you sure, want to remove from cart"))
                                                                removeProductFromCart(product?.productId)

                                                        }}>Remove</button>
                            </td>
                        </tr>
                    ))}

                    <tr className="table-light fw-bold">
                        <td></td>
                        <td> <button className='btn btn-primary'>Total</button> </td>
                        <td className="text-success"> <button className='btn btn-warning'>₹{price}</button>  </td>
                        <td> <button className='btn btn-info'>{qty}</button> </td>
                        <td colSpan="3"></td>
                    </tr>
                </tbody>
            </table>



        </>
    )
}

export default TableProduct