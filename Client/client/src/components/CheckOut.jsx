import React, { use, useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import TableProduct from './TableProduct'


const Cart = () => {
    const { cart, userAddress, decreaseQty, removeProductFromCart, clearCart } = useContext(AppContext)
    // console.log(cart)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()

    console.log(userAddress)
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
            <div className="container text-center">
                <h1>Order Summary</h1>

                <table className=" table table-primary table-sm">
                    <thead>
                        <tr>

                            <th scope="col" >Product's Details</th>
                            <th scope="col">Shipping Adderess</th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>

                                <TableProduct cart={cart} />


                            </td>
                            <td className="text-start d-flex justify-content-center">
                                {
                                    <ul className="list-group list-group-flush shadow-sm rounded bg-light p-3" style={{ maxWidth: "350px" }}>
                                        <li className="list-group-item fw-bold">
                                            Name: <span className="fw-normal">{userAddress?.fullName}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Phone No: <span className="text-muted">{userAddress?.phoneNumber}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Country: <span className="text-muted">{userAddress?.country}</span>
                                        </li>
                                        <li className="list-group-item">
                                            State: <span className="text-muted">{userAddress?.state}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Pincode: <span className="text-muted">{userAddress?.pincode}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Near By: <span className="text-muted">{userAddress?.address}</span>
                                        </li>
                                    </ul>
                                }
                            </td>


                        </tr>

                        

                    </tbody>
                </table>
                
            </div>

            <div className="container text-center">
                <button className='btn btn-primary'>Proceed to Pay</button>
            </div>








        </>
    )
}

export default Cart
