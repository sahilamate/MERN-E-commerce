import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: ""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log(formData)

    const result = await shippingAddress(
      fullName, address, city, state, country, pincode, phoneNumber 
    )

    console.log("address added", result)

    if(result.success){
        navigate('/checkout')
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: ""
    })
  }

  return (
    <>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: "1000px", borderRadius: "10px" }}>
          <h2 className="text-center mb-4 text-primary">Shipping Address</h2>

          <form onSubmit={submitHandler}>
            {/* User Name */}
            <div className='d-flex justify-content-between'>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-bold">Full Name</label>
                <input
                  name='fullName'
                  value={formData.fullName}
                  onChange={onChangeHandler}
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label fw-bold">Country</label>
                <input
                  name='country'
                  value={formData.country}
                  onChange={onChangeHandler}
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Enter your country"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label fw-bold">State</label>
                <input
                  name='state'
                  value={formData.state}
                  onChange={onChangeHandler}
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="Enter your state"
                />
              </div>
            </div>

            <div className='d-flex justify-content-between'>
              <div className="mb-3">
                <label htmlFor="city" className="form-label fw-bold">City</label>
                <input
                  name='city'
                  value={formData.city}
                  onChange={onChangeHandler}
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter your city"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label fw-bold">Pincode</label>
                <input
                  name='pincode'
                  value={formData.pincode}
                  onChange={onChangeHandler}
                  type="number"
                  className="form-control"
                  id="pincode"
                  placeholder="Enter your pincode"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number</label>
                <input
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={onChangeHandler}
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label fw-bold">AddressLine/NearBy</label>
              <input
                name='address'
                value={formData.address}
                onChange={onChangeHandler}
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter your address"
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" onSubmit={() => shippingAddress()} className="btn btn-primary btn-lg my-4">
                Submit
              </button>

              {
                userAddress && 
                <button type="submit" className="btn btn-warning btn-lg"
                onClick={() => navigate("/checkout")}>
                Use Old Address
              </button>
              }
             
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Address
