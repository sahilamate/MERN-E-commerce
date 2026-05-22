import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link, useParams } from 'react-router-dom'

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext)



  return (
    <div className="container my-5">
      <div className="row  justify-content-center">
        {filteredData?.map((eachProduct) => (
          <div key={eachProduct._id} className="col-sm-6 col-md-4 col-lg-3 mb-5">
            <div className="card bg-dark text-white h-100 shadow-lg rounded-3 d-flex flex-column p-2">

              {/* Image Section */}
              <Link to={`/product/${eachProduct._id}`} className='d-flex justify-content-center'>
                <img
                  src={eachProduct.imgSrc}
                  className="card-img-top mx-auto mt-3"
                  alt={eachProduct.title}
                  style={{ width: "200px", height: "250px", objectFit: "cover" }}
                /></Link>

              {/* Body Section */}
              <div className="card-body text-center d-flex flex-column pb-0">
                <h5 className="card-title">{eachProduct.title}</h5>

              </div>

              {/* Footer Buttons Section */}
              <div className="card-footer bg-transparent border-0 text-center pb-3">
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-primary">
                    {eachProduct.price} ₹
                  </button>
                  <button className="btn btn-danger" onClick={() => addToCart(eachProduct._id, eachProduct.title, eachProduct.price, 1, eachProduct.imgSrc)}>Add to Cart</button>

                  
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowProduct
