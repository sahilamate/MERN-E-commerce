import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RelatedProduct from './RelatedProduct'

const ProductDetails = () => {
  const { id } = useParams()
  const url = "http://localhost:3000/api"
  const [specificProduct, setSpecificProduct] = useState({})

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await axios.get(`${url}/product/${id}`)
      setSpecificProduct(response.data.product)
    }

    fetchDataFromAPI()
  }, [id])

  return (

    <>
    <div className="container d-flex flex-column flex-md-row justify-content-evenly align-items-center my-5 p-4 bg-light rounded ">
      
      {/* Product Image */}
      <img 
        src={specificProduct.imgSrc} 
        alt={specificProduct.title} 
        className="img-fluid rounded  mb-4 mb-md-0"
        style={{ width: "250px", height: "300px", objectFit: "cover" }}
      />

      {/* Product Info */}
      <div className="ms-md-4 text-center text-md-start ">
        <h1 className="fw-bold  text-center  text-dark">{specificProduct.title}</h1>
        <p className="text-muted  text-center ">{specificProduct.description}</p>
        <p className="fs-4 fw-semibold  text-center  text-success">{specificProduct.price} ₹</p>

        {/* Action Buttons */}
        <div className="d-flex gap-3 justify-content-center justify-content-md-start">
          <button className="btn btn-primary px-4">Buy Now</button>
          <button className="btn btn-danger px-4">Add To Cart</button>
        </div>
      </div>
    </div>

    <RelatedProduct productCategory = {specificProduct.category} />
    </>
  )
}

export default ProductDetails
