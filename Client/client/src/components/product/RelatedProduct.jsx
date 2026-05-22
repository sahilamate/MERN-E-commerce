import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const RelatedProduct = ({ productCategory }) => {

    const { products } = useContext(AppContext)

    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        const category = productCategory?.toLowerCase() || ""
        setRelatedProduct(products.filter((eachData) => eachData.category.toLowerCase() == category))
    }, [products, productCategory])

    


    

    return (
        <>
            <div className='text-center'>Related Products</div>


            <div className="container my-5">
             <div className="row  justify-content-center">
               {relatedProduct?.map((eachProduct) => (
                 <div key={eachProduct._id} className="col-sm-6 col-md-4 col-lg-3 mb-5">
                   <div className="card bg-dark text-white h-100 shadow-lg rounded-3 d-flex flex-column p-2">
                     
                
                     <Link to={`/product/${eachProduct._id}`} className='d-flex justify-content-center'>
                     <img
                       src={eachProduct.imgSrc}
                       className="card-img-top mx-auto mt-3"
                       alt={eachProduct.title}
                       style={{ width: "200px", height: "250px", objectFit: "cover" }}
                     /></Link>
       
                     <div className="card-body text-center d-flex flex-column pb-0">
                       <h5 className="card-title">{eachProduct.title}</h5>
                       
                     </div>
       
                     <div className="card-footer bg-transparent border-0 text-center pb-3">
                       <div className="d-flex justify-content-center gap-2">
                         <button className="btn btn-primary">
                           {eachProduct.price} ₹
                         </button>
                         <button className="btn btn-danger">Add to Cart</button>
                       </div>
                     </div>
       
                   </div>
                 </div>
               ))}
             </div>
           </div>


        </>
    )
}

export default RelatedProduct