import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context/AppContext'

const Navbar = () => {

  const [searchTerm, setsearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location)
  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext)

  // console.log("user cart", cart)

  const submitHandler = (event) => {
    event.preventDefault()
    navigate(`/product/search/${searchTerm}`)
    setsearchTerm("")
  }

  const filteredByCategory = (category) => {
    if (category === "No Filter") {
      setFilteredData(products)
    } else {

      setFilteredData(products.filter((data) => data?.category?.toLowerCase() == category?.toLowerCase()))
    }
  }

  const filteredByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price))
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark   shadow-sm  sticky-top flex-column align-item-center">

        <div className="container-fluid bg-dark p-3 ">
          {/* Brand */}
          <Link to={'/'} className="navbar-brand fw-bold fs-4" href="#">
            Mern E-Commerce
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Search bar */}
            <form className="d-flex mx-auto w-50" onSubmit={submitHandler}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => setsearchTerm(event.target.value)}
              />
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>

            {/* Right Buttons */}
            <div className="d-flex">
              {isAuthenticated &&
                <>

                  <Link to={'/cart'} type="button" className="btn btn-warning position-relative mx-3">

                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" /></svg>

                    {cart?.items?.length > 0 &&

                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart?.items?.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    }
                  </Link>

                  <Link to={"/profile"} className="btn btn-info mx-2">Profile</Link>
                  <button className="btn btn-danger mx-2" onClick={() => {
                    logout()
                    navigate('/')

                  }}>Logout</button>
                </>
              }

              {!isAuthenticated &&
                <>
                  <Link to={"/login"} className="btn btn-secondary mx-2">Login</Link>
                  <Link to={'/register'} className="btn btn-info mx-2">Register</Link>
                </>
              }
            </div>
          </div>
        </div>

        {
          location.pathname === "/" &&


          <div className="d-flex justify-content-center flex-wrap w-100 bg-white gap-2 p-3 rounded shadow-sm">
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => filteredByCategory("No Filter")}>No Filter</button>
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => filteredByCategory("Mobiles")}>Mobiles</button>
            <button className="btn btn-outline-success rounded-pill px-4" onClick={() => filteredByCategory("Laptops")}>Laptops</button>
            <button className="btn btn-outline-danger rounded-pill px-4" onClick={() => filteredByCategory("Camera")}>Camera's</button>
            <button className="btn btn-outline-warning rounded-pill px-4" onClick={() => filteredByCategory("Headphones")}>Headphones</button>
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => filteredByPrice(15999)}>15999</button>
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => filteredByPrice(25999)}>25999</button>
            <button className="btn btn-outline-success rounded-pill px-4" onClick={() => filteredByPrice(49999)}>49999</button>
            <button className="btn btn-outline-danger rounded-pill px-4" onClick={() => filteredByPrice(69999)}>69999</button>
            <button className="btn btn-outline-warning rounded-pill px-4" onClick={() => filteredByPrice(39999)}>39999</button>
          </div>
        }

      </nav>

    </>
  )
}

export default Navbar
