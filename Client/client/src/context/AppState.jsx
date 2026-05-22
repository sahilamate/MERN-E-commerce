import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Address from '../components/Address';

const AppState = (props) => {
  const data = 10
  const [products, setProducts] = useState([])
  const [token, setToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress, setUserAddress] = useState("false")
  // const url = "http://localhost:3000/api"
  const url = "https://mern-e-commerce-xvfx.onrender.com/api"


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const respnose = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      // console.log(respnose.data.products)
      setProducts(respnose.data.products)
      setFilteredData(respnose.data.products)
       userProfile()
       getAddress()
    }

    fetchDataFromAPI()
    userCart()


  }, [token, reload])
  

  useEffect(() => {
    const lsToken = localStorage.getItem('token')
    // console.log(lsToken)


    if (lsToken) {
      setToken(lsToken)
      setIsAuthenticated(true)
    }
  }, [])

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`,
      {
        name, email, password
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }

    )
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data
    // console.log("user registration", api)

  }

  //login user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`,
      {
        email, password
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }

    )
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log("user login", api.data)
    setToken(api.data.token)
    setIsAuthenticated(true)
    localStorage.setItem("token", api.data.token)
    return api.data

  }

  // logout user 
  const logout = () => {
    setIsAuthenticated(false)
    setToken("")
    localStorage.removeItem('token')

    toast.success("Logout Successfully...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  //user profile 
  const userProfile = async () => {
    const respnose = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token

      },
      withCredentials: true
    })
    // console.log(respnose.data.user)
    setUser(respnose.data.user)

  }

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const respnose = await axios.post(`${url}/cart/add`, { productId, title, price, qty, imgSrc }, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token
      },
      withCredentials: true
    })
    // console.log(respnose)
    setReload(!reload) //false ka true or true ka false
    toast.success(respnose.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // user cart
  const userCart = async () => {
    const respnose = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token
      },
      withCredentials: true
    })
    // console.log("user cart",respnose.data.cart.items)
    setCart(respnose.data.cart)

  }

  // decrease qty
  const decreaseQty = async (productId, qty) => {
    const respnose = await axios.post(`${url}/cart/--qty`, { productId, qty }, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token
      },
      withCredentials: true
    })

    setReload(!reload)
    console.log(respnose)
    toast.success(respnose.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // remove item from the cart
  const removeProductFromCart = async (productId) => {
    const respnose = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token
      },
      withCredentials: true
    })
    // console.log("remove item", removeProductFromCart)
    setReload(!reload)
    console.log(respnose)
    toast.success(respnose.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  //clear cart
  const clearCart = async () => {
    const respnose = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token
      },
      withCredentials: true
    })
    // console.log("remove item", removeProductFromCart)
    setReload(!reload)
    console.log(respnose)
    toast.success(respnose.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // add shipping Address
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const respnose = await axios.post(`${url}/address/add`, { fullName, address, city, state, country, pincode, phoneNumber }, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token
      },
      withCredentials: true
    })
    // console.log("remove item", removeProductFromCart)
    setReload(!reload)
    console.log(respnose)
    toast.success(respnose.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return respnose.data
  }

  // get user latest address 
  const getAddress = async () => {
    const respnose = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token
      },
      withCredentials: true
    })
    // console.log("user latest address,=", respnose.data.userAddress)
    // setProducts(respnose.data.products)
    setUserAddress(respnose.data.userAddress)

  }

  return (
    <AppContext.Provider value={{
      data,
      products,
      register,
      login,
      url,
      token,
      setIsAuthenticated,
      isAuthenticated,
      filteredData,
      setFilteredData,
      logout,
      user,
      addToCart,
      cart,
      decreaseQty,
      removeProductFromCart,
      clearCart,
      shippingAddress,
      userAddress
    }}>{props.children}</AppContext.Provider>



  )
}

export default AppState